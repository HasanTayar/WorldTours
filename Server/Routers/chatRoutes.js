const express = require('express');
const router = express.Router();
const {
  createMessage,
  getChatHistory,
  markAsRead,
  deleteMessage,
} = require('../Controllers/chatController');

router.post('/', createMessage);
router.get('/history', getChatHistory);
router.put('/read/:messageId', markAsRead);
router.delete('/:messageId', deleteMessage);

module.exports = router;
