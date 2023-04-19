import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Verify from './Components/verify'
import RegisterForm from './Components/SignupForm';
import Login from './Components/Login';
import UpdateForgottenPassword from './Components/updateForgtenPassword';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import AddTour from './Components/AddTours';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return token !== null;
  });
  const [user, setUser] = useState(()=>{
    const token = localStorage.getItem('token');
    return token !== null;
  });
  const [storedToken, setToken] = useState(null);
  console.log(isLoggedIn);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove token from local storage on logout
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(storedToken);
      fetch('/api/getLoginInUser', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          setIsLoggedIn(true);
        })
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users/verify/" element={<Verify />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/users/reset-password" element={<UpdateForgottenPassword />} />
            {/* <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} user={user}><Profile user={user} /></ProtectedRoute>} /> */}
            <Route path="/profile" element={<Profile user={user} />}></Route>
            <Route path="/addTour" element={<AddTour user={user}/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
