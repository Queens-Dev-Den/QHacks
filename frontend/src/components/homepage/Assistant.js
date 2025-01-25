import React from 'react';
import './Assistant.css';
import { GiBiceps } from "react-icons/gi";

const Assistant = () => {


    return (
        <div className="assistant-container">
        <GiBiceps classname="assistant-icon" size={80}/>
        <div className="assistant-text">
            <p>Hi, I'm your personal trainer! What can I help you with today?</p>
            </div>
        </div>
    );
};

export default Assistant;