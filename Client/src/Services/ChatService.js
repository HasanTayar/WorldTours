import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000'; // replace this with your server URL

export default function useChat(userId, roomId ) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(BASE_URL);

    socketRef.current.emit('join room', roomId, () => {
      // Callback function will be called after the server acknowledges the 'join room' event
      socketRef.current.emit('get messages', { roomId: roomId });
    });

    socketRef.current.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current.on('old messages', (oldMessages) => {
      setMessages(oldMessages);
    });

    socketRef.current.on('message deleted', (message) => {
      setMessages((prevMessages) => prevMessages.filter(m => m._id !== message._id));
    });

    socketRef.current.on('message updated', (updatedMessage) => {
      setMessages((prevMessages) => prevMessages.map(m => m._id === updatedMessage._id ? updatedMessage : m));
    });

    return () => {
      if (roomId) {
        socketRef.current.emit('leave room', roomId);
      }
      socketRef.current.disconnect();
    };
  }, [userId, roomId ]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit('send message', {
      roomId: roomId,
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
    socketRef.current.emit('get messages', { roomId: roomId });
  };

  return { messages, sendMessage, deleteMessage, markAsRead, getMessages };
}
