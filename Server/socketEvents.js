const chatController = require('./Controllers/chatController');
module.exports = (io) => {


io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for chat messages from clients
  socket.on('chatMessage', (message) => {
    // Save the message to the database
    chatController.addChatMessage(message);

    // Broadcast the message to all connected clients
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


};
