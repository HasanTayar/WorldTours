import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./ChatHistory.css";

const ChatHistory = ({ messages }) => {
  
  return (
    <div className="chat-history">
      <Card>
        <CardBody>
          <CardTitle>
            <FontAwesomeIcon icon={faCommentAlt} className="icon" /> Chat History
          </CardTitle>
          <div className="message-container">
            {messages && messages.map((message) => (
              <div key={message.id} className="message">
                <div className="message-info">
                  <span className="user">{message.user}</span>
                  <span className="time">{message.time}</span>
                </div>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ChatHistory;
