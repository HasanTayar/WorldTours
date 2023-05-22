const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    isAdmin: { type: Boolean, default: false }
});
  
module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
