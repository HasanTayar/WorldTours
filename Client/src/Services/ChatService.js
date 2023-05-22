import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000'; // replace this with your server URL

export default function useChat(userId, roomId ) {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  console.log(messages)
  useEffect(() => {
    socketRef.current = io(BASE_URL);

    // Join room immediately after connecting
    socketRef.current.emit('join room', roomId);

    socketRef.current.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socketRef.current.on('old messages', (oldMessages) => {
      setMessages(oldMessages);
    });

    // handle deleted message
    socketRef.current.on('message deleted', (message) => {
      setMessages((prevMessages) => prevMessages.filter(m => m._id !== message._id));
    });

    // handle message update
    socketRef.current.on('message updated', (updatedMessage) => {
      setMessages((prevMessages) => prevMessages.map(m => m._id === updatedMessage._id ? updatedMessage : m));
    });

    // Cleanup
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
