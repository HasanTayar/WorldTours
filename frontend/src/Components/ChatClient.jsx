import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import "../css/Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const chatbotPhotoUrl =
  "https://dcassetcdn.com/design_img/130158/46154/46154_1757480_130158_image.png";
const token = localStorage.getItem("token");
const photoUrl = "userPhoto";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [issues, setIssues] = useState([
    "Scamming",
    "My Orders",
    "Request to be Organizer",
    "Other",
  ]);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    axios
      .get(`/api/admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.table(response.data);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
      });

    const serverUrl = "http://localhost:5000";
    socketRef.current = io(serverUrl);

    socketRef.current.on("newMessage", (newMessage) => {
      if (newMessage.sender !== "WorldTours") {
        setCanSendMessage(true);
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!canSendMessage) {
      alert("Please wait for the admin to reply before sending a message.");
      return;
    }

    const newMessage = {
      sender: "Me",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    console.log("the msg is:", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    if (selectedUser === "WorldTours Chatbot") {
      axios
        .post("/api/chatbot", newMessage, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const replyMessage = {
            sender: "WorldTours",
            content: response.data.message,
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prevMessages) => [...prevMessages, replyMessage]);
        })
        .catch((error) => {});
    } else {
      socketRef.current.emit("sendMessage", newMessage);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
    setCanSendMessage(user === "WorldTours Chatbot");

    if (user === "WorldTours Chatbot") {
      const welcomeMessage = {
        sender: "WorldTours",
        content: "Hello! How can I help you today?",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
    } else {
      const adminWelcomeMessage = {
        sender: user,
        content:
          "Please select an issue from the dropdown below, and we will contact you within 48 hours.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, adminWelcomeMessage]);
    }
  };
  const isUserAllowedToSendMessage = () => {
    if (selectedUser === "WorldTours Chatbot") {
      return true;
    } else {
      const isIssueSelected = selectedIssue !== "";
      const isAdminResponded = messages.some((msg) => msg.sender !== "Me");
      return isIssueSelected && isAdminResponded;
    }
  };

  const handleIssueChange = (e) => {
    setSelectedIssue(e.target.value);
    if (e.target.value !== "Other") {
      setMessage(`I need help with ${e.target.value}`);
    } else {
      setMessage("");
    }
  };

  const handleOtherIssueChange = (e) => {
    setOtherIssue(e.target.value);
    setMessage(`I need help with ${e.target.value}`);
  };

  return (
    <div className="container chat-container">
      <div className="row">
        <div className="col-4 users-panel">
          <div className="list-group">
            <h4 className="list-group-header">Admins:</h4>

            {admins.map((admin, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${
                  selectedUser === admin.firstName ? "active" : ""
                }`}
                onClick={() => handleSelectUser(admin.firstName)}
              >
                <img
                  src={`${photoUrl}/${admin.photo}`}
                  alt={`${admin.firstName} avatar`}
                  className="message-avatar"
                />{" "}
                {admin.firstName}
              </button>
            ))}
          </div>
          <hr />
          <div className="list-group mt-3">
            <button
              className={`list-group-item list-group-item-action ${
                selectedUser === "WorldTours Chatbot" ? "active" : ""
              }`}
              onClick={() => handleSelectUser("WorldTours Chatbot")}
            >
              <img
                src={chatbotPhotoUrl}
                alt="WorldTours Chatbot avatar"
                className="message-avatar"
              />{" "}
              WorldTours Chatbot
            </button>
          </div>
        </div>
        {selectedUser === null ? (
          <div className="col-8 d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              icon={faComment}
              size="5x"
              style={{ color: "lightblue" }}
            />
            <h2 className="ml-3">
              Please select a conversation from the side bar
            </h2>
          </div>
        ) : (
          <div className="col-8">
            <div className="chat-header">
              <h2>Conversation with {selectedUser}:</h2>
            </div>
            <div className="chat-window border rounded">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === "Me" ? "sent" : "received"
                  }`}
                >
                  <img
                    src={
                      msg.sender === "WorldTours"
                        ? chatbotPhotoUrl
                        : `${photoUrl}/${msg.sender.photo}`
                    }
                    alt={`${msg.sender} avatar`}
                    className="message-avatar"
                  />
                  <div className="message-content">
                    <strong>{msg.sender}:</strong> {msg.content}{" "}
                    <em>({msg.timestamp})</em>
                  </div>
                </div>
              ))}
            </div>
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={!isUserAllowedToSendMessage()}
              />
              <button
                className="btn btn-primary"
                onClick={handleSendMessage}
                disabled={!isUserAllowedToSendMessage()}
              >
                Send
              </button>
            </div>
            {!isUserAllowedToSendMessage() && (
              <div className="alert alert-danger mt-3">
                You can only send a message after selecting an issue and
                receiving a response from the admin. Please be patient, we will
                respond within 48 hours.
              </div>
            )}
            {selectedUser !== "WorldTours Chatbot" && (
              <div className="mt-3">
                <label htmlFor="issue-select">Select an issue:</label>
                <select
                  className="form-control"
                  id="issue-select"
                  value={selectedIssue}
                  onChange={handleIssueChange}
                >
                  <option value="">Select an issue...</option>
                  {issues.map((issue, index) => (
                    <option key={index} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
                {selectedIssue === "Other" && (
                  <div className="mt-3">
                    <label htmlFor="other-issue">
                      Please describe your issue:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="other-issue"
                      value={otherIssue}
                      onChange={handleOtherIssueChange}
                      placeholder="Type your issue..."
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
