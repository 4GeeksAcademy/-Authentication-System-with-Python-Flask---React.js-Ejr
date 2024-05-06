import React, { useState } from "react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Chatbot from "../pages/Chatbot.js";

const ChatTab = () => {
    const [chatAbierto, setChatAbierto] = useState(false);

    const toggleChat = () => {
        setChatAbierto(!chatAbierto);
    };

    return (
        <div>
            <div id="chat-tab" onClick={toggleChat}>
                <FontAwesomeIcon icon={faComment} id="chat-icon" />
            </div>
            {chatAbierto && <Chatbot />} 
        </div>
    );
};

export default ChatTab;
