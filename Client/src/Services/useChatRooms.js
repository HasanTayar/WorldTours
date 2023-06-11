import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/chatRoom'; // Replace this with your server URL

export function useChatRooms() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    async function fetchChatRooms() {
      const response = await axios.get(`${BASE_URL}/chatrooms`);
      setChatRooms(response.data);
    }
    fetchChatRooms();
  }, []);

  return chatRooms;
}
