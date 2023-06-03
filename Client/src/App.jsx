import { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
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
          <AppContent
            user={user}
            setUser={setUser}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            handleChatBotToggle={handleChatBotToggle}
            showChatBot={showChatBot}
          />
        </div>
      </Router>
    </LoadScript>
  );
}

export default App;

function AppContent({ user, setUser, isLoggedIn, setIsLoggedIn, handleChatBotToggle, showChatBot }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(setIsLoggedIn, setUser);
    navigate("/");
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <div className="container mt-4">
        <AppRoutes
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
      <img
        src={ChatBotLogo}
        onClick={handleChatBotToggle}
        className="chatbot-toggle"
        alt="Chatbot"
      />
      {showChatBot && <ChatBot />}
    </>
  );
}
