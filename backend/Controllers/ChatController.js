const Chat = require('../Models/ChatModel');

exports.getChatHistory = async (req, res) => {
  try {
    const { userId1, userId2 } = req.query;

    const chatHistory = await Chat.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).send(chatHistory);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching the chat history. Please try again.' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    const chat = new Chat({ sender: senderId, receiver: receiverId, message });
    await chat.save();

    res.status(200).send(chat);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ message: 'An error occurred while sending the message. Please try again.' });
  }
};

exports.chatWithBot = async (req, res) => {
  try {
    const userMessage = req.body.content;
    const botResponse = handleUserMessage(userMessage);
    res.send({ message: botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while chatting with the bot. Please try again.' });
  }
};

function handleUserMessage(message) {

  message = message.toLowerCase();

  if (message.includes('password')) {
    return 'To reset your password, Please jump into profile page there be a tab to rest your password!';
  } else if (message.includes('contact admin')) {
    return 'You can contact the admin at chat page on admins pannels';
  } else if (message.includes('tour')) {
    return 'To find tours, chocice from the navbar tours you can find all the tours';
  } else {
    return 'I am not sure how to help you with that.';
  }
}
