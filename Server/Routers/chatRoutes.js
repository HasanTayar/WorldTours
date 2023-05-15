const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/chatController');

// Route to create a new chat
router.post('/chats', chatController.createNewChat);

// Route to send a message
router.post('/chats/:chatId/messages', chatController.sendMessage);

// Route to get chat history
router.get('/chats/:chatId/messages', chatController.getChatHistory);

module.exports = router;
