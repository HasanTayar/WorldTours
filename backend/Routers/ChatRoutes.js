const express = require('express');
const router = express.Router();
const ChatController = require('../Controllers/ChatController');
const passport = require('passport');

router.get('/chat-history', passport.authenticate('jwt', { session: false }), ChatController.getChatHistory);
router.post('/chatbot', passport.authenticate('jwt', { session: false }), ChatController.chatWithBot);
router.post('/sendMessage',passport.authenticate('jwt', { session: false }), ChatController.sendMessage);
  
module.exports = router;
