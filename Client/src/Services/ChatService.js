import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000'; // Replace this with your server URL

export default function useChat(userId, receiverId) {
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const socketRef = useRef();
  const roomId = useRef(null);

  useEffect(() => {
    socketRef.current = io(BASE_URL);

    socketRef.current.emit('join room', roomId.current, () => {
      socketRef.current.emit('get messages', { roomId: roomId.current });
      socketRef.current.emit('get unread count', { userId: userId });
    });

    socketRef.current.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (message.sender._id !== userId && !message.read) {
        incrementUnreadCount(message.sender._id);
      }
    });

    socketRef.current.on('old messages', (oldMessages) => {
      setMessages(oldMessages);

      oldMessages.forEach((message) => {
        if (message.sender._id !== userId && !message.read) {
          incrementUnreadCount(message.sender._id);
        }
      });
    });

    socketRef.current.on('message deleted', (message) => {
      setMessages((prevMessages) => prevMessages.filter((m) => m._id !== message._id));
    });

    socketRef.current.on('message updated', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((m) => (m._id === updatedMessage._id ? updatedMessage : m))
      );

      if (updatedMessage.read) {
        decrementUnreadCount(updatedMessage.sender._id);
      }
    });

    socketRef.current.on('unread count', (countData) => {
      setUnreadMessages(countData);
    });

    return () => {
      if (roomId.current) {
        socketRef.current.emit('leave room', roomId.current);
      }
      socketRef.current.disconnect();
    };
  }, [userId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit('send message', {
      roomId: roomId.current,
      recipient: receiverId, 
      content: messageBody,
      sender: userId,
    });
  };
  

  const deleteMessage = (messageId) => {
    socketRef.current.emit('delete message', { messageId });
  };

  const markAsRead = (messageId) => {
    socketRef.current.emit('mark as read', { messageId });
  };

  const getMessages = () => {
    socketRef.current.emit('get messages', { roomId: roomId.current });
  };

  const incrementUnreadCount = (userId) => {
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [userId]: (prevUnreadMessages[userId] || 0) + 1,
    }));
  };

  const decrementUnreadCount = (userId) => {
    setUnreadMessages((prevUnreadMessages) => ({
      ...prevUnreadMessages,
      [userId]: Math.max((prevUnreadMessages[userId] || 0) - 1, 0),
    }));
  };

  return {
    messages,
    sendMessage,
    deleteMessage,
    markAsRead,
    getMessages,
    roomId,
    unreadMessages,
    setUnreadMessages,
  };
}
