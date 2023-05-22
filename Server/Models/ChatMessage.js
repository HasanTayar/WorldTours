const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  timestamp: { type: Date, default: Date.now },
  read: {type: Boolean , default:false },
  deleted: {type: Boolean , default: false},
});

ChatMessageSchema.index({ room: 1 });

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);