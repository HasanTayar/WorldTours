exports.chatWithBot = async (req, res) => {
    try {
      const userMessage = req.body.content;
      if (!userMessage) {
        return res.status(400).send({ message: 'Message content is required.' });
      }
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
        return "If you need to reset your password, simply go to your profile page and look for the 'Reset Password' tab. Follow the instructions, and you'll have a new password in no time!";
      } else if (message.includes('contact admin')) {
        return "If you need to get in touch with an admin, you can find them in the chat section of the admin panel. They'll be happy to help with any questions or concerns you have!";
      } else if (message.includes('tour')) {
        return 'Exploring tours is easy! Just click on the "Tours" option in the navbar, and you\'ll be able to browse through all the exciting tours we have available. Find the perfect adventure for you, and start planning your unforgettable journey!';
      } else if (message.includes('booking')) {
        return "To book a tour, simply select the tour you're interested in and follow the booking process. You'll be able to choose your preferred dates and provide any necessary information. Get ready for an amazing experience!";
      } else if (message.includes('cancel')) {
        return "We understand that plans can change. To cancel a booking, please contact our customer support team, and they'll be happy to assist you with the cancellation process.";
      } else {
        return "I'm sorry, I'm not sure how to help you with that. Please provide more information or try rephrasing your question.";
      }
    }      
  