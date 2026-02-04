import React, { useState } from 'react';
import { Send, X, Smile, Paperclip } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatProps {
  onClose: () => void;
}

const mockMessages = [
  { id: 1, user: 'Alex', text: 'Love the colors!', time: '12:01', color: '#ff6b6b' },
  { id: 2, user: 'Sarah', text: 'Can we try drawing a coffee shop?', time: '12:02', color: '#51cf66' },
  { id: 3, user: 'Mika', text: 'Sure! I am starting with the counter.', time: '12:05', color: '#339af0' },
];

export function Chat({ onClose }: ChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      user: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: '#ff6b6b'
    }]);
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#24283b] border-l border-[#dee2e6] dark:border-[#414868] shadow-2xl">
      <div className="p-4 border-b border-[#dee2e6] dark:border-[#414868] flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Collaborators
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-[#414868] rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400" style={{ color: msg.user !== 'You' ? msg.color : undefined }}>
                {msg.user}
              </span>
              <span className="text-[10px] text-gray-400">{msg.time}</span>
            </div>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
              msg.user === 'You' 
                ? 'bg-[#ff6b6b] text-white rounded-tr-none shadow-md shadow-pink-500/10' 
                : 'bg-gray-100 dark:bg-[#1a1b26] dark:text-[#c0caf5] rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-[#dee2e6] dark:border-[#414868] bg-gray-50/50 dark:bg-[#1a1b26]/50 backdrop-blur-sm">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white dark:bg-[#24283b] border border-[#dee2e6] dark:border-[#414868] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/50 transition-all pr-10"
          />
          <button 
            type="submit"
            className="absolute right-2 p-1.5 text-[#ff6b6b] hover:bg-[#ff6b6b]/10 rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center gap-4 mt-3 px-1">
          <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Smile size={16} />
          </button>
          <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <Paperclip size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
