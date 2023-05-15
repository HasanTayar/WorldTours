// chatSocket.js
const Chat = require('../Models/ChatModel');
const Message = require('../Models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', async ({ chatId, message, senderId, receiverId }) => {
      try {
        let chat = await Chat.findById(chatId);
        if (!chat) {
          console.log(`Chat ${chatId} not found. Creating a new chat.`);
          chat = new Chat({ _id: chatId, participants: [senderId, receiverId] });
          await chat.save();
        }
    
        const newMessage = new Message({ content: message, sender: senderId, receiver: receiverId });
        await newMessage.save();
    
        chat.messages.push(newMessage);
        await chat.save();
    
        // Emit a new 'chatMessage' event to all clients in the same chat
        io.to(receiverId).emit('chatMessage', newMessage);  // send message to specific receiver
      } catch (error) {
        console.error('Error handling chatMessage event:', error);
      }
    });
    
    
    

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
