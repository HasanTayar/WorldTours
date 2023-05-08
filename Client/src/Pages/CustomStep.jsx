import React, { useState, useEffect } from 'react';

const CustomStep = (props) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const processMessage = async (message) => {
      // Process the user's message and generate a response
      // You can call your chatbot service here and replace the following line with the bot's response
      const botResponse = `You said: ${message}`;

      setResponse(botResponse);
      props.triggerNextStep();
    };

    processMessage(props.step.message);
  }, [props]);

  return (
    <div className="custom-step">
      <p>{response}</p>
    </div>
  );
};

export default CustomStep;
