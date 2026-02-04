import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Message } from '../components/Chat';

interface UseChatProps {
    roomId: string;
    user: { id: string; name: string } | null;
    myClientId: string;
    isChatOpen: boolean;
    userColor: string;
}

export function useChat({ roomId, user, myClientId, isChatOpen, userColor }: UseChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const chatChannelRef = useRef<RealtimeChannel | null>(null);
    const isChatOpenRef = useRef(isChatOpen);

    // Keep ref in sync
    useEffect(() => {
        isChatOpenRef.current = isChatOpen;
        if (isChatOpen) {
            setUnreadCount(0);
        }
    }, [isChatOpen]);

    // Subscribe to chat
    useEffect(() => {
        if (!roomId) return;

        const channel = supabase.channel(`chat:${roomId}`, {
            config: {
                broadcast: { self: false },
            },
        });

        channel
            .on('broadcast', { event: 'message' }, ({ payload }) => {
                const newMessage: Message = {
                    id: payload.id,
                    user: payload.user || 'Anonymous',
                    userId: payload.userId,
                    text: payload.text,
                    time: payload.time,
                    color: payload.color,
                    timestamp: payload.timestamp,
                };

                setMessages((prev) => {
                    if (prev.some(msg => msg.id === newMessage.id)) return prev;
                    return [...prev, newMessage].sort((a, b) => a.timestamp - b.timestamp);
                });

                if (!isChatOpenRef.current) {
                    setUnreadCount(prev => prev + 1);
                }
            })
            .subscribe();

        chatChannelRef.current = channel;

        return () => {
            channel.unsubscribe();
        };
    }, [roomId]);

    const sendMessage = (text: string) => {
        const timestamp = Date.now();
        const newMessage: Message = {
            id: `${myClientId}-${timestamp}`,
            user: user?.name || 'Guest',
            userId: myClientId,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            color: userColor,
            timestamp,
        };

        setMessages((prev) => [...prev, newMessage]);

        chatChannelRef.current?.send({
            type: 'broadcast',
            event: 'message',
            payload: newMessage,
        });
    };

    return {
        messages,
        unreadCount,
        sendMessage
    };
}
