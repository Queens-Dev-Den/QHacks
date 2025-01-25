import React from 'react';
import './Assistant.css';
import { GiBiceps } from "react-icons/gi";

const Assistant = () => {

    return (
        <div className="assistant-container">
            <div className = "top-content">
                <GiBiceps className="assistant-icon"/>
                <p className="assistant-top-text">Hi, I'm your personal trainer! What can I help you with today?</p>
            </div>
            <p className="assistant-bottom-text"><em>Tap here to talk to me...</em></p>
        </div>
    );
};

export default Assistant;