import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm EcoBite Assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey] = useState(import.meta.env.VITE_GEMINI_KEY || '');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendBotMessage = async (text) => {
    setIsTyping(true);
    try {
      const { data } = await axios.post(
        'https://api.gemini.com/v1/chat/completions',
        {
          model: 'gemini-1.0',
          messages: [
            { role: 'system', content: 'You are EcoBite restaurant assistant.' },
            ...messages.map(m => ({ role: m.sender === 'bot' ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: text }
          ]
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );
      const botText = data.choices[0].message.content;
      setMessages(prev => [...prev, { id: Date.now(), text: botText, sender: 'bot', timestamp: new Date() }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now(), text: 'Oops, something went wrong.', sender: 'bot', timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !apiKey) return;

    const newMsg = { id: Date.now(), text: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, newMsg]);
    sendBotMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 p-4 rounded-full shadow-xl text-white transition-transform transform hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && apiKey && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="z-50 mt-4 w-80 sm:w-96 max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center bg-gradient-to-r from-green-600 to-green-500 text-white p-4">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center mr-3">
                <span className="text-green-600 text-xl font-bold">E</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">EcoBite Assistant</h3>
                <p className="text-xs opacity-75">Powered by Gemini</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50 space-y-3 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-200">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>  
                  <div className={`relative max-w-[75%] px-4 py-2 rounded-xl ${m.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 shadow'}`}>               
                    <p className="text-sm leading-snug">{m.text}</p>
                    <span className="text-[10px] opacity-50 absolute bottom-1 right-2">
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="bg-white px-3 py-2 rounded-xl shadow max-w-[60%]"
                  >
                    <div className="flex space-x-1">
                      {[0,1,2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ delay: i*0.2, repeat: Infinity, duration: 0.6 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center border-t border-gray-200 px-3 py-2">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow px-3 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-r-full hover:bg-green-700 transition disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-away Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}  
    </div>
  );
};

export default Chatbot;