"use server";

import { pusherServer } from "../lib/pusher";
import axios from "axios";

export const sendMessage = async (message, recipientId, senderId) => {
  try {
    // Validate inputs
    if (!message || !message.trim()) {
      throw new Error("Message cannot be empty.");
    }
    if (!recipientId || !senderId) {
      throw new Error("Recipient ID and Sender ID are required.");
    }

    // Prepare the message payload
    const newMessage = {
      recipient_id: recipientId,
      sender_id: senderId,
      body: message,
    };

    // Send the message to the API
    const response = await axios.post("http://localhost:8000/api/messages", newMessage);

    // Debugging: Log the response data
    console.log("Sent message response:", response.data);

    // Notify connected clients via Pusher
    await pusherServer.trigger("chat-app", "upcoming-message", {
      message: response.data, // Use response data to ensure consistency with DB
    });

    return response.data; // Return the message response if needed
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw new Error("Failed to send message. Please try again.");
  }
};
