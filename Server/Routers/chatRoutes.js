const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/chatController');

// Route to create a new chat
router.post('/chats', chatController.createNewChat);

// Route to send a message
router.post('/chats/:chatId/messages', chatController.sendMessage);

// Route to get chat history
router.get('/chats/:chatId/messages', chatController.getChatHistory);

//Route to get all the chat
router.get('/chats' , chatController.getAllChats);
module.exports = router;
