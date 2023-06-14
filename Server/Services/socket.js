const socketIO = require('socket.io');
const chatService = require('./chatService');
let io;

const initialize = (httpServer) => {
  io = socketIO(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join room', async (roomId) => {
      socket.join(roomId);
      const oldMessages = await chatService.getMessages(roomId);
      socket.emit('old messages', oldMessages);
    });

    socket.on('new message', async ({ roomId, senderId, content }) => {
      const message = await chatService.saveMessage(roomId, senderId, content);
      io.to(roomId).emit('new message', message);
    });

    socket.on('message read', async (messageId) => {
      const message = await chatService.markMessageAsRead(messageId);
      io.to(message.room.toString()).emit('message read', message._id);
    });

    socket.on('message delete', async (messageId) => {
      const message = await chatService.deleteMessage(messageId);
      io.to(message.room.toString()).emit('message delete', message._id);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = {
  initialize,
  getIO,
};
