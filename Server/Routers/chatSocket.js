const chatController = require('../Controllers/chatController');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected.');

    socket.on('join', async ({ room }) => {
      socket.join(room);
      const messages = await chatController.getMessages(room);
      socket.emit('load messages', messages);
    });

    socket.on('send message', async (messageData) => {
      await chatController.saveMessage(messageData);
      io.to(messageData.room).emit('new message', messageData);
    });

    socket.on('delete message', async (id) => {
      await chatController.deleteMessage(id);
      io.emit('message deleted', id);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });
  });
};
