import React, { useState, useEffect, useRef } from 'react';
import './Assistant.css';
import { GiBiceps } from "react-icons/gi";

const Assistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [content, setContent] = useState('');
  const [responseMessage, setResponseMessage] = useState('Welcome! How can I assist you today?');
  const popupRef = useRef(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsChatOpen(false);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  const handleSubmit = async (e) => {
    setResponseMessage('Thinking...');
    e.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/gpt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            const data = await response.json();
            setResponseMessage(data.message); // Update the response message
          } else {
            const data = await response.json();
            setResponseMessage(data.error || 'Failed to retrieve message');
        }
    } catch (error) {
        setResponseMessage('Failed to retrieve message');
    }

    setContent('');
    };

  return (
    <div className={`assistant-container ${isChatOpen ? 'blur-background' : ''}`} onClick={toggleChat}>
      <div className="top-content">
        <GiBiceps className="assistant-icon" />
        <p className="assistant-top-text">Hi, I'm your personal trainer! What can I help you with today?</p>
      </div>
      <p className="assistant-bottom-text"><em>Tap here to talk to me...</em></p>

      {isChatOpen && (
        <div className="chat-popup" ref={popupRef} onClick={(e) => e.stopPropagation()}>
          <div className="chat-header">
            <h2>Chat with Personal Trainer</h2>
          </div>
          <div className='chat-box'>
            <div className="chat-body">
                <p>{responseMessage}</p>
            </div>
            <div className="chat-input">
                <form className="chat-input-form" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={content}
                    id='content'
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start typing..."
                    className="chat-input-field"
                    required
                    />
                    <button type="submit" className="chat-submit-button">Send</button>
                </form>
            </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;