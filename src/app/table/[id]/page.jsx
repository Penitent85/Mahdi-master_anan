"use client";
import React, { useContext, useEffect, useState } from "react";
import { pusherClient } from "../../../lib/pusher";
import { sendMessage } from "../../../actions/message.action";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    TextField,
    Stack,
    Paper,
    Badge,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BsFillTelephoneFill, BsCameraVideoFill, BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
}));

const Header = styled(Box)({
    padding: "16px",
    borderBottom: "1px solid #2d2d2d",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const ProfileSection = styled(Box)({
    padding: "20px",
    borderBottom: "1px solid #2d2d2d",
    textAlign: "center",
});

const ChatArea = styled(Box)({
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    "&::-webkit-scrollbar": {
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#424242",
        borderRadius: "4px",
    },
});

const MessageBubble = styled(Box)(({ issender }) => ({
    backgroundColor: issender === "true" ? "#1e88e5" : "#262626",
    padding: "12px 16px",
    borderRadius: "18px",
    maxWidth: "70%",
    marginBottom: "8px",
    alignSelf: issender === "true" ? "flex-end" : "flex-start",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.02)",
    },
    color: issender === "true" ? "#ffffff" : "#ffffff",
}));

const InputArea = styled(Box)({
    padding: "16px",
    borderTop: "1px solid #2d2d2d",
    display: "flex",
    alignItems: "center",
    gap: "12px",
});

const StyledTextField = styled(TextField)({
    "& .MuiInputBase-root": {
        backgroundColor: "#262626",
        color: "#ffffff",
        borderRadius: "20px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
});

const ChatUI = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const param = useParams();
    const { id } = param;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { userId } = useContext(AppContext);
    const currentUserId = localStorage.getItem("userId");

    console.log("iam sender ", id);

    const onSendMessageHandler = async () => {
        if (message.trim() === "") return; // Prevent sending empty messages

        // Add the new message to the UI immediately after sending
        const newMessage = {
            body: message,
            sender_id: currentUserId,
            recipient_id: Number(id), // assuming the recipient is passed via `id`
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Send the message
        await sendMessage(message, Number(id), currentUserId);
        setMessage(""); // Clear input after sending
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/messages");
                setMessages(response.data.data); // Assume the API returns an array of messages
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();

        // Pusher subscription
        pusherClient.subscribe("chat-app");
        pusherClient.bind("upcoming-message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        return () => pusherClient.unsubscribe("chat-app");
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSendMessageHandler();
        }
    };

    return (
        <StyledPaper elevation={0}>
            <Header>
                <Box display="flex" alignItems="center" gap={2}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        color="success"
                    >
                        <Avatar
                            src="images.unsplash.com/photo-1494790108377-be9c29b29330"
                            alt="User Avatar"
                        />
                    </Badge>
                </Box>
                <Box>
                    <IconButton color="primary" aria-label="voice call">
                        <BsFillTelephoneFill />
                    </IconButton>
                    <IconButton color="primary" aria-label="video call">
                        <BsCameraVideoFill />
                    </IconButton>
                </Box>
            </Header>

            <ProfileSection>
                <Stack direction="row" spacing={4} justifyContent="center" marginTop={2}></Stack>
            </ProfileSection>

            <ChatArea>
                <Stack spacing={1}>
                    {messages.map((msg, index) => (
                        <MessageBubble
                            key={index}
                            issender={Number(msg.recipient_id) === Number(currentUserId) ? "true" : "false"}
                        >
                            <Typography color="inherit">{msg.body}</Typography>
                        </MessageBubble>
                    ))}
                </Stack>
            </ChatArea>

            <InputArea>
                <IconButton color="primary" aria-label="emoji">
                    <BsEmojiSmile />
                </IconButton>
                <StyledTextField
                    fullWidth
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    maxRows={3}
                    size="small"
                />
                <IconButton color="primary" onClick={onSendMessageHandler} aria-label="send message">
                    <IoSend />
                </IconButton>
            </InputArea>
        </StyledPaper>
    );
};

export default ChatUI;
