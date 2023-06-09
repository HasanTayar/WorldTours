const socketIO = require('socket.io');
const ChatMessage = require('../Models/ChatMessage');
const mongoose = require('mongoose');
let io;

module.exports = {
  initialize: (httpServer) => {
    io = socketIO(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "UPDATE"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log("A user connected!");
      socket.on('get unread count', async ({ userId }) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(userId)) {
            return;
          }
      
          const unreadCount = await ChatMessage.countDocuments({
            recipients: userId,
            read: false,
          });
          console.log(unreadCount);
      
          io.to(socket.id).emit('unread count', unreadCount);
        } catch (error) {
          console.error('Error retrieving unread count:', error);
        }
      });

      socket.on('join room', async (roomId, callback) => {
        try {
          socket.join(roomId);
          console.log("joined room");
          callback();  // Acknowledge the event

          const oldMessages = await ChatMessage.find({ room: roomId })
            .populate('sender')
            .exec();
          socket.emit('old messages', oldMessages);
        } catch (error) {
          console.error('Error joining room:', error);
        }
      });

      socket.on('leave room', (roomId) => {
        socket.leave(roomId);
        console.log("A user disconnected!");
      });

      socket.on('send message', async ({ sender, content, roomId , recipient}) => {
        console.log("sender\n", sender ,"\ncontent\n", content ,"\n roomdId \n",roomId , "\nrecipient\n", recipient);
        try {
          const newMessage = new ChatMessage({ sender, recipient ,  content, room: roomId });
          await newMessage.save();
          // Fetch the saved message again from database and then populate sender and recipient
          const savedMessage = await ChatMessage.findById(newMessage._id).populate('sender').populate('recipient');
          io.to(roomId).emit('new message', savedMessage);
        } catch (error) {
          console.error('Error sending new message:', error);
        }
      });
      

      socket.on('delete message', async ({ messageId }) => {
        try {
          const deletedMessage = await ChatMessage.findByIdAndUpdate(
            messageId,
            { deleted: true },
            { new: true }
          );
          io.emit('message deleted', deletedMessage);
        } catch (error) {
          console.error('Error deleting message:', error);
        }
      });

      socket.on('get messages', async ({ roomId }) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return;
          }

          const messages = await ChatMessage.find({
            room: roomId,
            deleted: false,
          })
            .populate('sender')
            .exec();
            
          io.to(socket.id).emit('old messages', messages);
        } catch (error) {
          console.error('Error retrieving messages:', error);
        }
      });

      socket.on('mark as read', async ({ messageId }) => {
        try {
          const updatedMessage = await ChatMessage.findByIdAndUpdate(
            messageId,
            { read: true },
            { new: true }
          );
    
          // Ensure that the message is saved correctly
          if (updatedMessage) {
            io.to(updatedMessage.room).emit('message updated', updatedMessage); // Emit to the room
          } else {
            console.error('Failed to mark message as read:', messageId);
          }
        } catch (error) {
          console.error('Error marking message as read:', error);
        }
      });
      
    
    });
    
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};