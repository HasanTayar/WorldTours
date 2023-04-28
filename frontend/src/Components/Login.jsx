import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import axios from 'axios';
function Login({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUser, setLocalUser] = useState([]);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const photoFile = "../userPhoto/";

  function handleSignupClick() {
    navigate('/register');
  }



  async function handleLogin(e, email, password) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('/api/login', { email, password });

      const { token } = response.data;
      localStorage.setItem('token', token);

      const userResponse = await axios.get('/api/getLoginInUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userResponse.data);
      setIsLoggedIn(true);
      console.table(response.data);
      navigate('/', { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(`/api/user/${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      if (data) {
        setLocalUser(data);
        setShowPasswordInput(true);
      } else {
        setError('No user found. Please sign up first.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('An error occurred while fetching user data.');
    }
  }


  const handleResetPassword = async () => {
    setError("");

    try {
      const response = await axios.post('/api/forgot-password', { email });
      console.table(response);
      setError(response.data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred while resetting your password.");
    }
  };


  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          {error && <div className="alert alert-danger">{error}</div>}
          {!showPasswordInput ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
              <div className="login-footer">
                <p>Don't have an account? Sign up now!</p>
                <button
                  type="button"
                  className="btn btn-secondary signup-button"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => handleLogin(e, email, password)}>
              <div className="user-profile mb-3">
                <img
                  className="profile-image"
                  src={`${photoFile}/${localUser.photo}`}
                  alt="Profile"
                />
                <div className="welcome-text">
                  <p>
                    <strong>Welcome back,</strong>
                  </p>
                  <h2>
                    {localUser.firstName} {localUser.lastName}!
                  </h2>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                type="button"
                className="btn btn-link"
                onClick={handleResetPassword}
              >
                Forgot password?
              </button>
            </form>
          )}
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

