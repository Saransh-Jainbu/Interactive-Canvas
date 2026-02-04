import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface ChatProps {
  onClose: () => void;
  userName?: string;
  userId?: string;
  userColor?: string;
}

interface Message {
  id: string;
  user: string;
  userId: string;
  text: string;
  time: string;
  color: string;
  timestamp: number;
}

// Popular emojis for quick access
const EMOJI_LIST = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂',
  '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
  '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥳', '😏', '😒',
  '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺',
  '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶',
  '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
  '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲',
  '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧',
  '😷', '🤒', '🤕', '🤑', '🤠', '👍', '👎', '👏', '🙌', '👌',
  '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️',
  '✋', '🤚', '🖐️', '🖖', '👋', '🤝', '💪', '🙏', '✍️', '💅',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
  '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '🔥',
  '✨', '💫', '⭐', '🌟', '💯', '🎉', '🎊', '🎈', '🎁', '🏆',
];

export function Chat({ onClose, userName: propUserName, userId: propUserId, userColor: propUserColor }: ChatProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState(propUserName || 'Anonymous');
  const [userColor, setUserColor] = useState(propUserColor || '#ff6b6b');
  const [roomId, setRoomId] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const myUserId = useRef(propUserId || Math.random().toString(36).substring(7));

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update user info when props change
  useEffect(() => {
    if (propUserName) setUserName(propUserName);
    if (propUserColor) setUserColor(propUserColor);
    if (propUserId) myUserId.current = propUserId;
  }, [propUserName, propUserColor, propUserId]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showEmojiPicker && !target.closest('.emoji-picker-container')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  // Initialize room
  useEffect(() => {
    // Get room ID from URL
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room') || 'default-room';
    setRoomId(room);
  }, []);

  // Setup Supabase Realtime for chat
  useEffect(() => {
    if (!roomId) return;

    const channel = supabase.channel(`chat:${roomId}`, {
      config: {
        broadcast: {
          self: false, // Don't receive our own messages via broadcast
        },
      },
    });

    channel
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        const newMessage: Message = {
          id: payload.id,
          user: payload.user,
          userId: payload.userId,
          text: payload.text,
          time: payload.time,
          color: payload.color,
          timestamp: payload.timestamp,
        };

        setMessages((prev) => {
          // Avoid duplicates
          if (prev.some(msg => msg.id === newMessage.id)) {
            return prev;
          }
          return [...prev, newMessage].sort((a, b) => a.timestamp - b.timestamp);
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Connected to chat room:', roomId);
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [roomId]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const timestamp = Date.now();
    const newMessage: Message = {
      id: `${myUserId.current}-${timestamp}`,
      user: userName,
      userId: myUserId.current,
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: userColor,
      timestamp,
    };

    // Add message locally first (optimistic update)
    setMessages((prev) => [...prev, newMessage]);

    // Broadcast to other users
    channelRef.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: newMessage,
    });

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
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-[#1a1b26] flex items-center justify-center">
              <Send size={24} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">No messages yet</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              const isMyMessage = msg.userId === myUserId.current;
              return (
                <div key={msg.id} className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: isMyMessage ? '#ff6b6b' : msg.color }}
                    >
                      {isMyMessage ? 'You' : msg.user}
                    </span>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${isMyMessage
                    ? 'bg-[#ff6b6b] text-white rounded-tr-none shadow-md shadow-pink-500/10'
                    : 'bg-gray-100 dark:bg-[#1a1b26] dark:text-[#c0caf5] rounded-tl-none'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
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

        <div className="relative flex items-center gap-4 mt-3 px-1 emoji-picker-container">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <Smile size={16} />
          </button>

          {/* Emoji Picker Dropdown */}
          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mb-2 bg-white dark:bg-[#24283b] border border-[#dee2e6] dark:border-[#414868] rounded-2xl shadow-2xl overflow-hidden z-50 w-full max-w-xs"
              >
                {/* Header */}
                <div className="px-4 py-2 border-b border-[#dee2e6] dark:border-[#414868] bg-gray-50 dark:bg-[#1a1b26]">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Pick an Emoji
                  </p>
                </div>

                {/* Emoji Grid */}
                <div className="p-3 overflow-y-auto" style={{ maxHeight: '288px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    gap: '4px'
                  }}>
                    {EMOJI_LIST.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setMessage(prev => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-2xl hover:bg-gray-100 dark:hover:bg-[#1a1b26] rounded-lg p-2 transition-all hover:scale-110 active:scale-95"
                        style={{
                          cursor: 'pointer',
                          border: 'none',
                          background: 'transparent'
                        }}
                        title={emoji}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
