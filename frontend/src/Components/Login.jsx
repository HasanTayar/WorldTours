import { useState , useEffect } from "react";
import '../css/login.css';

function Login() {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUserState] = useState([]);
  const [error, setError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [uploadsFolder, setUploadsFolder] = useState('');

  useEffect(() => {
    const getUploadsFolder = async () => {
      try {
        const response = await fetch('/api/uploads');
        const { uploadsFolder } = await response.json();
        setUploadsFolder(uploadsFolder);
      } catch (error) {
        console.error('Error fetching uploads folder:', error);
      }
    };
  
    getUploadsFolder();
  }, []);
  
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const { token, user } = await response.json();
      localStorage.setItem('token', token);
      setUser(user);
      setUserType(user.isOrganizer ? 'organizer' : 'user'); // check user type and set userType state accordingly
      setIsLoggedIn(true);
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
        setUserState(data.user);
        setShowPasswordInput(true);
      } else {
        setError('No user found. Please sign up first.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('An error occurred while fetching user data.');
    }
  };
  console.table(user);
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
                Welcome back, {user.firstName} {user.lastName}!
              </p>
              <img src={`${uploadsFolder}/${user.photo}`} alt="Profile" width="100" height="100" />

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
  
