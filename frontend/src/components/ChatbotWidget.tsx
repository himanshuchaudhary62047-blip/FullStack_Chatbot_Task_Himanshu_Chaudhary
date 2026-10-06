import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';
import { getBotResponse, INITIAL_BOT_MESSAGE, PREDEFINED_QUESTIONS } from '../utils/chatbotLogic';

interface ChatbotWidgetProps {
  onNavigate: (sectionId: string) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = sessionStorage.getItem('dronetv_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'msg-init',
        sender: 'bot',
        text: INITIAL_BOT_MESSAGE.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: INITIAL_BOT_MESSAGE.suggestedQuestions,
      },
    ];
  });

  const [inputQuestion, setInputQuestion] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem('dronetv_chat_history', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (questionText?: string) => {
    const textToSend = questionText || inputQuestion;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const botRes = getBotResponse(textToSend);

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: botRes.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: botRes.suggestedQuestions,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputQuestion('');

    if (botRes.actionTarget) {
      // Optional slight delay so user can read before smooth scrolling
      setTimeout(() => {
        onNavigate(botRes.actionTarget as string);
      }, 1200);
    }
  };

  const handleResetChat = () => {
    const initialMsg: ChatMessage = {
      id: `bot-reset-${Date.now()}`,
      sender: 'bot',
      text: INITIAL_BOT_MESSAGE.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: INITIAL_BOT_MESSAGE.suggestedQuestions,
    };
    setMessages([initialMsg]);
    sessionStorage.removeItem('dronetv_chat_history');
  };

  return (
    <section id="chatbot" className="chatbot-section">
      <div className="section-header">
        <h2 className="section-title">DroneTV Rule-Based AI Support Assistant</h2>
        <p className="section-subtitle">Ask any question or pick a topic below for instant, automated answers.</p>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-status">
            <span className="online-indicator"></span>
            <div>
              <div className="chat-title">Support Assistant</div>
              <div className="chat-sub">Rule-Based Instant Help</div>
            </div>
          </div>
          <button className="chat-reset-btn" onClick={handleResetChat} title="Reset Conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            Reset Chat
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
              <div className="message-bubble">
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{msg.timestamp}</div>
              </div>

              {msg.sender === 'bot' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="quick-suggestions">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      className="suggestion-chip"
                      onClick={() => handleSendMessage(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-predefined-bar">
          <span className="predefined-label">Quick Questions:</span>
          <div className="predefined-scroll">
            {PREDEFINED_QUESTIONS.map((q, i) => (
              <button key={i} className="mini-chip" onClick={() => handleSendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>

        <form
          className="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="chat-input"
            placeholder="Type your question here..."
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
          />
          <button type="submit" className="chat-send-btn" disabled={!inputQuestion.trim()}>
            Send
          </button>
        </form>
      </div>
    </section>
  );
};
