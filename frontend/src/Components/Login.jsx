import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/login.css';
function Login({ setIsLoggedIn, setUser }) {
   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localUser, setLocalUser] = useState([]);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const photoFile = '../userPhoto/';
  const handleLogin = async (e , email, password) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const { token, user } = await response.json();
      localStorage.setItem('token', token);
      setUser(user); // Update the user state in the App component
      setIsLoggedIn(true); // Update the isLoggedIn state in the App component
      navigate('/', { replace: true }); // Navigate to the homepage
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  
  

  
  const handleEmailSubmit = async (e) => {
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
  };
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="Login" style={{ minWidth: '500px' }}>
        <h1>Login</h1>
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
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <p>
                Welcome back, {localUser.firstName} {localUser.lastName}!
              </p>
              <img src={`${photoFile}/${localUser.photo}`} alt="Profile" width="100" height="100" />

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
    </div>
  );
};
  
  
  export default Login;
  
