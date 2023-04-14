import React, { useState } from "react";
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUserState] = useState(null);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("api/user/:userId'", {
        email,
      });

      if (response.data) {
        setUserState(response.data);
        setShowPasswordInput(true);
      } else {
        setError("No user found. Please sign up first.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("An error occurred while fetching user data.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch.post("http://your-api-url.com/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Update user data in the context
        setUser({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          photo: user.photo,
         
        });

        // Redirect to the home page
        window.location.href = "/home";
      } else {
        setError("Invalid password. Please try again or reset your password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in.");
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
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <p>
                Welcome back, {user.first_name} {user.last_name}!
              </p>
              <img src={user.photo} alt="Profile" width="100" height="100" />
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
  
