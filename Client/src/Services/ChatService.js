import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000'; // Replace this with your server URL

export default function useChat(userId, roomId) {
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(BASE_URL);

    socketRef.current.emit('join room', roomId, () => {
      // Callback function will be called after the server acknowledges the 'join room' event
      socketRef.current.emit('get messages', { roomId: roomId });
    });

    socketRef.current.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
  
      // If the message was not sent by the current user and is not read, mark it as read
      if (message.sender._id !== userId && !message.read) {
        markAsRead(message._id);
      } else {
        // Increase the number of unread messages if the message sender is not the current user
        setUnreadMessages((prevCount) => prevCount + 1);
      }
    });
  
    socketRef.current.on('old messages', (oldMessages) => {
      setMessages(oldMessages);
  
      // Mark all received messages as read
      oldMessages.forEach((message) => {
        if (message.sender._id !== userId && !message.read) {
          markAsRead(message._id);
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

      // Decrease the number of unread messages if a message has been marked as read
      if (updatedMessage.read) {
        setUnreadMessages((prevCount) => prevCount - 1);
      }
    });

    return () => {
      if (roomId) {
        socketRef.current.emit('leave room', roomId);
      }
      socketRef.current.disconnect();
    };
  }, [userId, roomId]);

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

  const updateUnreadMessages = (count) => {
    setUnreadMessages(count);
  };

  return { messages, sendMessage, deleteMessage, markAsRead, getMessages, unreadMessages, updateUnreadMessages };
}
