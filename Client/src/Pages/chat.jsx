import React from 'react';
import ChatBot from 'react-simple-chatbot';
import CustomStep from './CustomStep';

const WorldToursBot = () => {
  return (
    <ChatBot
      steps={[
        {
          id: '1',
          message: 'Welcome to World Tours! What would you like to know?',
          trigger: 'userInput',
        },
        {
          id: 'userInput',
          user: true,
          trigger: 'customStep',
        },
        {
          id: 'customStep',
          component: <CustomStep />,
          asMessage: true,
          waitAction: true,
          trigger: 'userInput',
        },
      ]}
    />
  );
};

export default WorldToursBot;
