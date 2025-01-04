import React from "react";

const Message = ({ message }) => {
    return (
        <div
            style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                textAlign: "left",
            }}
        >
            <p>
                <strong>{message?.body}</strong> <em>({message?.sent_at})</em>
            </p>
            <p>{message?.content}</p>
        </div>
    );
};

export default Message;
