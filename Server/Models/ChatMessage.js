const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatMessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'ChatRoom',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

ChatMessageSchema.index({ room: 1 });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
