import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000'; // Replace this with your server URL

export default function useChat(senderId, receiverId) {
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0); // Add unreadMessages state
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(BASE_URL);

    if (receiverId) {
      socketRef.current.emit('join room', receiverId);

      socketRef.current.on('old messages', (oldMessages) => {
        setMessages(oldMessages);
      });

      socketRef.current.on('new message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        if (message.sender !== senderId) {
          setUnreadMessages((prevUnread) => prevUnread + 1);
        }
      });

      socketRef.current.on('message read', (messageId) => {
        setMessages((prevMessages) =>
          prevMessages.map((m) => (m._id === messageId ? { ...m, read: true } : m))
        );
        if (receiverId === senderId) {
          setUnreadMessages(0);
        }
      });

      socketRef.current.on('message delete', (messageId) => {
        setMessages((prevMessages) => prevMessages.filter((m) => m._id !== messageId));
      });
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, [receiverId, senderId]);

  const sendMessage = (content) => {
    if (receiverId) {
      socketRef.current.emit('new message', { roomId: receiverId, senderId, content });
    }
  };

  const deleteMessage = (messageId) => {
    if (receiverId) {
      socketRef.current.emit('message delete', messageId);
    }
  };

  const markAsRead = (messageId) => {
    if (receiverId) {
      socketRef.current.emit('message read', messageId);
    }
  };

  const updateUnreadMessages = (count) => {
    setUnreadMessages(count);
  };

  return {
    messages,
    sendMessage,
    deleteMessage,
    markAsRead,
    unreadMessages,
    updateUnreadMessages,
  };
}
