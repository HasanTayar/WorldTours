import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import EmailForm from "../../Components/auth/EmailForm";
import LoginForm from "../../Components/auth/LoginForm";
import { checkUserDetails, getUserByEmail, getUserByToken, forgotPassword } from "../../Services/userService";
import Footer from "../../Components/auth/Footer";

function Login({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUser, setLocalUser] = useState([]);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);
  
  const handleSignupClick = () => {
    navigate("/register");
  }

  const handleForgotPassword = async () => {
    const success = await forgotPassword(email, setError);

    if (success) {
      setPasswordResetEmailSent(true);
      setShowPasswordInput(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await getUserByEmail(email, setError, setLocalUser, setShowPasswordInput);
  };

  const checkInputs = async (e, email, password) => {
    e.preventDefault();
    const success = await checkUserDetails(email, password, setError);

    if (success) {
      await getUserByToken(setUser, setIsLoggedIn, setError);
    
      if (localUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          {passwordResetEmailSent && (
            <div className="alert alert-success">
              A reset password email has been sent. Please check your inbox.
            </div>
          )}
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
              onForgotPassword={handleForgotPassword}
            />
          )}
          <Footer handleSignupClick={() => handleSignupClick()} />
        </div>
        <div className="login-image">
          <img src="https://source.unsplash.com/random/800x600?travel" alt="Travel" />
        </div>
      </div>
    </div>
  );
}

export default Login;
