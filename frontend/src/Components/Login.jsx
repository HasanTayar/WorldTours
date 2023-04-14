import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
function Login({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUser, setLocalUser] = useState([]);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [unvEmail, setUnvEmail] = useState("");
  const photoFile = "../userPhoto/";

  function handleSignupClick() {
    navigate('/register');
  }
  async function handleLogin(e, email, password) {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const responseData = await response.json();
      const { token, user } = responseData;
      localStorage.setItem('token', token);
      setUser(user); // Update the user state in the App component
      setUnvEmail(user.email);
      setIsLoggedIn(true); // Update the isLoggedIn state in the App component
      console.table(responseData);
      navigate('/', { replace: true }); // Navigate to the homepage
    } catch (error) {
      setError(error.message);
    }
  }
  if (error == 'Your email has not been verified. Please verify your email before logging in.') {
    setTimeout(() =>
      navigate("/verification", { state: { email } })
      , 3000)
  }



  async function handleEmailSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/user/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.user) {
        setLocalUser(data.user);
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
    try {
      await axios.post("http://your-api-url.com/resetPassword", { email });
      setError("A new password has been sent to your email.");
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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

