const chatBotController = require('../Controllers/chatBotController');
const express = require('express');
const router = express.Router();

router.post('/bot', chatBotController.chatWithBot);
module.exports = router;