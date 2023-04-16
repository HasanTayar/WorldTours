import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

import VerificationCode from './Components/VerificationCode';
import RegisterForm from './Components/SignupForm';
import Login from './Components/Login';
import UpdateForgottenPassword from './Components/updateForgtenPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verification" element={<VerificationCode />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}/>
            <Route path="/reset-password" element={<UpdateForgottenPassword/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
