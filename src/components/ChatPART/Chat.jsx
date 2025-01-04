'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import Message from "./Message";

const Chat = () => {
    const [messages, setMessages] = useState([]); // Store messages
    const [input, setInput] = useState(""); // Message input

    // Fetch messages from the API when the component loads
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/messages");
                setMessages(response.data.data); // Assume the API returns an array of messages
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

       // fetchMessages();

        // Initialize Pusher
        const pusher = new Pusher("b926797e1290948fa49b", {
            cluster: "ap2",
        });

        const channel = pusher.subscribe("messages");
        channel.bind("new-message", (data) => {
            // Update the messages state with the new message
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Cleanup function
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);

    // Send a message to the API
    const sendMessage = async (e) => {
        e.preventDefault();

        const newMessage = {
            recipient_id: "32",
            sender_id: "3",
            body: input,
        };

        try {
            // Send the message to the API
            const response = await axios.post("http://localhost:8000/api/messages", newMessage);

            // Debugging: Log the response data
            console.log("Sent message response:", response.data);

            // Check if the response contains a valid message
            if (response.data && response.data.data) {
                const savedMessage = response.data.data; // Assume API returns the saved message
                setMessages((prevMessages) => [...prevMessages, savedMessage]);
            } else {
                console.error("API response does not contain a valid message.");
            }

            setInput(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div style={{ width: "80%", margin: "0 auto", maxWidth: "600px" }}>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    height: "300px",
                    overflowY: "scroll",
                    marginBottom: "20px",
                }}
            >
                {messages?.map((msg, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Message message={msg} />
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{ width: "70%", padding: "10px" }}
                />
                <button type="submit" style={{ padding: "10px", marginLeft: "10px" }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
