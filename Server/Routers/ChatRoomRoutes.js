const express = require('express');
const router = express.Router();
const ChatRoom = require('../Models/ChatRoom');
const { isValidObjectId } = require('mongoose');

router.post('/initiate', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log(req.body);
    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      return res.status(400).json({ error: 'Invalid senderId or receiverId' });
    }

    const existingChatRoom = await ChatRoom.findOne({
      users: { $all: [senderId, receiverId] },
    });

    if (existingChatRoom) {
      return res.json({ roomId: existingChatRoom._id });
    }

    // Create a new chat room
    const newChatRoom = new ChatRoom({
      users: [senderId, receiverId],
    });

    const savedChatRoom = await newChatRoom.save();

    res.json({ roomId: savedChatRoom._id });
  } catch (error) {
    console.error('Error initiating chat room:', error);
    res.status(500).json({ error: 'Failed to initiate chat room' });
  }
});

module.exports = router;
