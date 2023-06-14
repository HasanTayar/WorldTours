const express = require('express');
const chatService = require('../Services/chatService');
const router = express.Router();

router.post('/initiate', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const room = await chatService.createChatRoom([senderId, receiverId]);
    return res.json({ roomId: room._id });
  } catch (error) {
    return res.status(500).json({ error: 'Error initiating chat room' });
  }
});

router.post('/message', async (req, res) => {
  try {
    const { roomId, senderId, content } = req.body;
    const message = await chatService.saveMessage(roomId, senderId, content);
    return res.json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Error saving message' });
  }
});

router.put('/message/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await chatService.markMessageAsRead(id);
    return res.json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Error marking message as read' });
  }
});

router.delete('/message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await chatService.deleteMessage(id);
    return res.json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting message' });
  }
});

router.get('/chatrooms', async (req, res) => {
  try {
    const rooms = await ChatRoom.find();
    return res.json(rooms);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching chat rooms' });
  }
});

router.get('/messages/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await chatService.getMessages(roomId);
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching messages' });
  }
});

module.exports = router;
