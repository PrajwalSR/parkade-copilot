import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'; // <-- Import the new library
import styles from './ChatWindow.module.css';
import markdownStyles from './MarkdownStyles.module.css'; // <-- Import the new styles

// --- (Icon components remain the same) ---
const CloseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="24" height="24"> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> );
const SendIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"> <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /> </svg> );

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your Parkade Co-pilot. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const webhookUrl = 'https://giraffe-sound-supposedly.ngrok-free.app/webhook/dc0b4c12-8db9-4ce2-b3d6-8d3fe0f3e585/chat';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: input }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      const aiMessage = { role: 'ai', content: data.output || "Sorry, I couldn't get a response." };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error fetching from n8n:", error);
      const errorMessage = { role: 'ai', content: "Sorry, I'm having trouble connecting. Please ensure the n8n workflow is active and ngrok is running." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <h2 className={styles.title}>Parkade Co-pilot</h2>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close chat">
          <CloseIcon />
        </button>
      </div>

      <div className={styles.messageArea}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
            {/* THIS IS THE KEY CHANGE */}
            {/* We now wrap the content in the ReactMarkdown component */}
            <div className={markdownStyles.markdownContainer}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.ai}`}>
            <div className={styles.loadingDots}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask a question..."
          className={styles.textInput}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button className={styles.sendButton} onClick={handleSend} disabled={isLoading} aria-label="Send message">
            <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;