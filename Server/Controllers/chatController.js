const Chat = require('../Models/ChatModel');
const Message = require('../Models/Message');

exports.createNewChat = async (req, res) => {
    const participants = req.body.participants;

    try {
        const chat = new Chat({ participants });
        await chat.save();

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: 'Error creating chat: ' + error.message });
    }
};

exports.sendMessage = async (req, res) => {
    const { chatId, senderId, content } = req.body;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        const message = new Message({ content, sender: senderId });
        await message.save();

        chat.messages.push(message);
        await chat.save();

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message: ' + error.message });
    }
};

exports.getChatHistory = async (req, res) => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findById(chatId).populate('messages');
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(500).json({ error: 'Error getting chat history: ' + error.message });
    }
};
