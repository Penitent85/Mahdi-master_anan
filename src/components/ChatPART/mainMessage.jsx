// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     Avatar,
//     IconButton,
//     TextField,
//     Stack,
//     Paper,
//     Badge,
//     useMediaQuery,
//     useTheme,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { BsFillTelephoneFill, BsCameraVideoFill, BsEmojiSmile } from "react-icons/bs";
// import { IoSend } from "react-icons/io5";
//
// const StyledPaper = styled(Paper)(({ theme }) => ({
//     backgroundColor: "#1a1a1a",
//     color: "#ffffff",
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
// }));
//
// const Header = styled(Box)({
//     padding: "16px",
//     borderBottom: "1px solid #2d2d2d",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
// });
//
// const ProfileSection = styled(Box)({
//     padding: "20px",
//     borderBottom: "1px solid #2d2d2d",
//     textAlign: "center",
// });
//
// const ChatArea = styled(Box)({
//     flex: 1,
//     padding: "16px",
//     overflowY: "auto",
//     "&::-webkit-scrollbar": {
//         width: "8px",
//     },
//     "&::-webkit-scrollbar-thumb": {
//         backgroundColor: "#424242",
//         borderRadius: "4px",
//     },
// });
//
// const MessageBubble = styled(Box)(({ isUser }) => ({
//     backgroundColor: isUser ? "#0095f6" : "#262626",
//     padding: "12px 16px",
//     borderRadius: "18px",
//     maxWidth: "70%",
//     marginBottom: "8px",
//     alignSelf: isUser ? "flex-end" : "flex-start",
//     transition: "all 0.2s ease-in-out",
//     "&:hover": {
//         transform: "scale(1.02)",
//     },
// }));
//
// const InputArea = styled(Box)({
//     padding: "16px",
//     borderTop: "1px solid #2d2d2d",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
// });
//
// const StyledTextField = styled(TextField)({
//     "& .MuiInputBase-root": {
//         backgroundColor: "#262626",
//         color: "#ffffff",
//         borderRadius: "20px",
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//         border: "none",
//     },
// });
//
// const ChatUI = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([
//         { text: "Hey! How are you?", isUser: false },
//         { text: "I'm good, thanks! How about you?", isUser: true },
//         { text: "I'm doing great! Want to catch up?", isUser: false },
//     ]);
//
//     const handleSendMessage = () => {
//         if (message.trim()) {
//             setMessages([...messages, { text: message, isUser: true }]);
//             setMessage("");
//         }
//     };
//
//     const handleKeyPress = (event) => {
//         if (event.key === "Enter" && !event.shiftKey) {
//             event.preventDefault();
//             handleSendMessage();
//         }
//     };
//
//     return (
//         <StyledPaper elevation={0}>
//             <Header>
//                 <Box display="flex" alignItems="center" gap={2}>
//                     <Badge
//                         overlap="circular"
//                         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                         variant="dot"
//                         color="success"
//                     >
//                         <Avatar
//                             src="images.unsplash.com/photo-1494790108377-be9c29b29330"
//                             alt="User Avatar"
//                         />
//                     </Badge>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                         Sarah Johnson
//                     </Typography>
//                 </Box>
//                 <Box>
//                     <IconButton color="primary" aria-label="voice call">
//                         <BsFillTelephoneFill />
//                     </IconButton>
//                     <IconButton color="primary" aria-label="video call">
//                         <BsCameraVideoFill />
//                     </IconButton>
//                 </Box>
//             </Header>
//
//             <ProfileSection>
//                 <Avatar
//                     src="images.unsplash.com/photo-1494790108377-be9c29b29330"
//                     alt="Profile Avatar"
//                     sx={{ width: 80, height: 80, margin: "0 auto 16px" }}
//                 />
//                 <Typography variant="h6" gutterBottom>
//                     Sarah Johnson
//                 </Typography>
//                 <Stack
//                     direction="row"
//                     spacing={4}
//                     justifyContent="center"
//                     marginTop={2}
//                 >
//                     <Box textAlign="center">
//                         <Typography variant="h6">542</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Posts
//                         </Typography>
//                     </Box>
//                     <Box textAlign="center">
//                         <Typography variant="h6">12.5k</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Followers
//                         </Typography>
//                     </Box>
//                     <Box textAlign="center">
//                         <Typography variant="h6">948</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                             Following
//                         </Typography>
//                     </Box>
//                 </Stack>
//             </ProfileSection>
//
//             <ChatArea>
//                 <Stack spacing={1}>
//                     {messages.map((msg, index) => (
//                         <MessageBubble key={index} isUser={msg.isUser}>
//                             <Typography color="inherit">{msg.text}</Typography>
//                         </MessageBubble>
//                     ))}
//                 </Stack>
//             </ChatArea>
//
//             <InputArea>
//                 <IconButton color="primary" aria-label="emoji">
//                     <BsEmojiSmile />
//                 </IconButton>
//                 <StyledTextField
//                     fullWidth
//                     placeholder="Type a message..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     multiline
//                     maxRows={3}
//                     size="small"
//                 />
//                 <IconButton
//                     color="primary"
//                     onClick={handleSendMessage}
//                     aria-label="send message"
//                 >
//                     <IoSend />
//                 </IconButton>
//             </InputArea>
//         </StyledPaper>
//     );
// };
//
// export default ChatUI;
