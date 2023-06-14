const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatRoomSchema = new Schema({
  users: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
    },
  ],
  isAdmin: { 
    type: Boolean, 
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
