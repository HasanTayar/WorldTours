import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import EmailForm from "../../Components/auth/EmailForm";
import LoginForm from "../../Components/auth/LoginForm";
import { checkUserDetails, getUserByEmail, getUserByToken } from "../../Services/userService";
import Footer from "../../Components/auth/Footer";
function Login({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUser, setLocalUser] = useState([]);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  function handleSignupClick() {
    navigate("/register");
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await getUserByEmail(email, setError, setLocalUser, setShowPasswordInput);
  };

  const checkInputs = async (e, email, password) => {
    e.preventDefault();
    const success = await checkUserDetails(email, password, setError);
    if (success) {
      await getUserByToken(setUser, setIsLoggedIn, setError);
      navigate("/");
    }
  };

  
  

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          {error && <div className="alert alert-danger">{error}</div>}
          {!showPasswordInput ? (
            <EmailForm
              email={email}
              setEmail={setEmail}
              setError={setError}
              onSubmit={handleEmailSubmit}
            />
          ) : (
            <LoginForm
              email={email}
              password={password}
              setError={setError}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
              setPassword={setPassword}
              localUser={localUser}
              navigate={navigate}
              onSubmit={checkInputs}
            />
          )}
          <Footer handleSignupClick={()=>handleSignupClick()} />
        </div>
    
        <div className="login-image">
          <img
            src="https://source.unsplash.com/random/800x600?travel"
            alt="Travel"
          />
        </div>
      </div>
      
    </div>
  );
}

export default Login;
