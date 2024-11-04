// // MedicalChatBot.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Shield, Send, AlertCircle, Info } from 'lucide-react';
// import "./ChatApp.css";

// const ChatApp = () => {
//   const [messages, setMessages] = useState([
//     {
//       type: 'bot',
//       content: "Welcome to our Medical Assistant. I'm here to provide general medical information and guidance. Please note that this service is not a substitute for professional medical diagnosis or treatment. How may I assist you today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const formatTimestamp = (date) => {
//     return new Intl.DateTimeFormat('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     }).format(date);
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     const newMessage = {
//       type: 'user',
//       content: inputMessage,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, newMessage]);
//     setInputMessage('');
//     setIsTyping(true);

//     try {
//       // Simulate API call - Replace with actual FastAPI endpoint
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           type: 'bot',
//           content: "I understand your concern. Let me provide you with relevant medical information based on current healthcare guidelines. [Sample response - Replace with actual LLM response]",
//           timestamp: new Date()
//         }]);
//         setIsTyping(false);
//       }, 1500);
//     } catch (error) {
//       setMessages(prev => [...prev, {
//         type: 'error',
//         content: "I apologize, but I'm having trouble processing your request. Please try again or contact our support team if the issue persists.",
//         timestamp: new Date()
//       }]);
//       setIsTyping(false);
//     }
//   };

//   return (
//     <div className={`medical-chatbot-container ${isMinimized ? 'minimized' : ''}`}>
//       <div className="chat-header">
//         <div className="header-left">
//           <Shield className="header-icon" size={24} />
//           <div className="header-content">
//             <h2>Medical Assistant</h2>
//             <div className="status-indicator">
//               <span className="status-dot"></span>
//               <p>Active & Ready to Help</p>
//             </div>
//           </div>
//         </div>
//         <button 
//           className="minimize-button"
//           onClick={() => setIsMinimized(!isMinimized)}
//         >
//           {isMinimized ? '+' : '-'}
//         </button>
//       </div>

//       <div className="messages-container">
//         <div className="security-banner">
//           <Info size={16} />
//           <span>End-to-end encrypted conversation</span>
//         </div>

//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.type}-message`}
//           >
//             <div className="message-avatar">
//               {message.type === 'bot' ? '👨‍⚕️' : message.type === 'error' ? '⚠️' : '👤'}
//             </div>
//             <div className="message-bubble">
//               <div className="message-content">
//                 {message.content}
//               </div>
//               <div className="message-timestamp">
//                 {formatTimestamp(message.timestamp)}
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {isTyping && (
//           <div className="message bot-message">
//             <div className="message-avatar">👨‍⚕️</div>
//             <div className="message-bubble">
//               <div className="typing-indicator">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="input-section">
//         <div className="compliance-banner">
//           <AlertCircle size={14} />
//           <span>HIPAA Compliant Service</span>
//         </div>
        
//         <form onSubmit={sendMessage} className="input-container">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type your health question here..."
//             className="message-input"
//           />
//           <button type="submit" className="send-button" disabled={!inputMessage.trim()}>
//             <Send size={20} />
//           </button>
//         </form>

//         <div className="disclaimer">
//           <strong>Important Notice:</strong> This AI assistant provides general medical information only. 
//           For emergencies, please call your local emergency services immediately.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;


import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, AlertCircle, Info } from 'lucide-react';
import "./ChatApp.css";

const API_URL = "https://f744-104-155-154-141.ngrok-free.app";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Welcome to our Medical Assistant. I'm here to provide general medical information and guidance. Please note that this service is not a substitute for professional medical diagnosis or treatment. How may I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Set default to true
  const messagesEndRef = useRef(null);

  useEffect(() => {
    checkApiConnection();
    // Set up periodic health checks
    const intervalId = setInterval(checkApiConnection, 30000); // Check every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  const checkApiConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.status === "healthy");
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.warn("Health check failed:", error);
      setIsConnected(true); // Keep the chat functional even if health check fails
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.response,
        timestamp: new Date(data.timestamp)
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        type: 'error',
        content: "I apologize, but I'm having trouble processing your request. Please try again or contact our support team if the issue persists.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`medical-chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header">
        <div className="header-left">
          <Shield className="header-icon" size={24} />
          <div className="header-content">
            <h2>Medical Assistant</h2>
            <div className="status-indicator">
              <span className={`status-dot ${isConnected ? 'connected' : ''}`}></span>
              <p>Active & Ready to Help</p>
            </div>
          </div>
        </div>
        <button 
          className="minimize-button"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? '+' : '-'}
        </button>
      </div>

      <div className="messages-container">
        <div className="security-banner">
          <Info size={16} />
          <span>End-to-end encrypted conversation</span>
        </div>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type}-message`}
          >
            <div className="message-avatar">
              {message.type === 'bot' ? '👨‍⚕️' : message.type === 'error' ? '⚠️' : '👤'}
            </div>
            <div className="message-bubble">
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-timestamp">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-avatar">👨‍⚕️</div>
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-section">
        <div className="compliance-banner">
          <AlertCircle size={14} />
          <span>HIPAA Compliant Service</span>
        </div>
        
        <form onSubmit={sendMessage} className="input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your health question here..."
            className="message-input"
          />
          <button type="submit" className="send-button" disabled={!inputMessage.trim()}>
            <Send size={20} />
          </button>
        </form>

        <div className="disclaimer">
          <strong>Important Notice:</strong> This AI assistant provides general medical information only. 
          For emergencies, please call your local emergency services immediately.
        </div>
      </div>
    </div>
  );
};

export default ChatApp;



