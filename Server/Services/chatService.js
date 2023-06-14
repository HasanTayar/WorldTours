const ChatRoom = require('../Models/ChatRoom');
const ChatMessage = require('../Models/ChatMessage');
const mongoose = require('mongoose');

const createChatRoom = async (userIds) => {
  // Ensure we have unique users
  const users = [...new Set(userIds)];
    console.log(users);
  // Check for existing chat room
  const existingRoom = await ChatRoom.findOne({ users: { $all: users } });

  if (existingRoom) {
    return existingRoom;
  }

  // Create new room
  const newRoom = new ChatRoom({ users });
  console.log("new rom ? \n",newRoom , "Exitring room ?" ,existingRoom );
  return await newRoom.save();
};
 
const saveMessage = async (roomId, senderId, content) => {
  const newMessage = new ChatMessage({ room: roomId, sender: senderId, content });
  await newMessage.save();
  return newMessage.populate('sender');
};

const markMessageAsRead = async (messageId) => {
  const updatedMessage = await ChatMessage.findByIdAndUpdate(
    messageId,
    { read: true },
    { new: true }
  );

  if (!updatedMessage) {
    throw new Error(`Failed to mark message as read: ${messageId}`);
  }

  return updatedMessage;
};

const deleteMessage = async (messageId) => {
  const deletedMessage = await ChatMessage.findByIdAndUpdate(
    messageId,
    { deleted: true },
    { new: true }
  );

  if (!deletedMessage) {
    throw new Error(`Failed to delete message: ${messageId}`);
  }

  return deletedMessage;
};

const getMessages = async (roomId) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new Error('Invalid room id');
  }

  return ChatMessage.find({
    room: roomId,
    deleted: false,
  }).populate('sender');
};

module.exports = {
  createChatRoom,
  saveMessage,
  markMessageAsRead,
  deleteMessage,
  getMessages,
};
