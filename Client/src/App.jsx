import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import { LoadScript } from "@react-google-maps/api";
import { logout } from "./Services/userService.js";
import { getToken } from "./Services/token";
import AppRoutes from "./Components/Routers/AppRoutes";
import ChatBot from "./Pages/ChatBot/ChatBot";
import ChatBotLogo from "./assets/ChatBotLogo.png";

import "./App.css";
// import { deleteAllChatBotMessages } from "./Services/ChatService";
const googleMapsApiKey = "AIzaSyDhDzbFCa7X0FwHS3aBCFGIpg1coS8UdjE";
const libraries = ["places"];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = getToken();
    return token !== null;
  });
  const handleChatBotToggle = () => {
    setShowChatBot(!showChatBot);
  };
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries}
      onLoad={() => console.log("Google Maps API loaded")}
      onError={(error) =>
        console.error("Error loading Google Maps API:", error)
      }
    >
      <Router>
        <div className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={() => logout(setIsLoggedIn, setUser)}
          />

          <div className="container mt-4">
            <AppRoutes
              isLoggedIn={isLoggedIn}
              user={user}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </div>
        <img
          src={ChatBotLogo}
          onClick={handleChatBotToggle}
          className="chatbot-toggle"
          alt="Chatbot"
        />

        {showChatBot && <ChatBot />}
      </Router>
    </LoadScript>
  );
}

export default App;
