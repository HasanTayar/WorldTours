import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Verify from './Components/verify'
import RegisterForm from './Components/SignupForm';
import Login from './Components/Login';
import UpdateForgottenPassword from './Components/updateForgetsPassword';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import CreateTourForm from './Components/CreateTour';
import ChatPage from './Components/ChatClient';
import { LoadScript } from '@react-google-maps/api';
import TourList from './Components/TourList';
import TourDetails from './Components/TourDetails';
import OrganizerDetails from './Components/OrganizerDetails';
const token = localStorage.getItem('token');

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
    localStorage.removeItem('token'); 
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
  const googleMapsApiKey = 'AIzaSyDhDzbFCa7X0FwHS3aBCFGIpg1coS8UdjE';
  const libraries = ['places'];
  return (
    <LoadScript
    googleMapsApiKey={googleMapsApiKey}
    libraries={libraries}
    onLoad={() => console.log('Google Maps API loaded')}
    onError={(error) => console.error('Error loading Google Maps API:', error)}
  >
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users/verify/" element={<Verify />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/users/reset-passwtoursord/" element={<UpdateForgottenPassword />} />
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} user={user}><Profile user={user} /></ProtectedRoute>} />
            <Route path="/add-new-tours/" element={<CreateTourForm user={user} />}></Route>
            <Route path="/chat/" element={<ChatPage currentUser={user}/>}></Route>
            <Route path="/tours/" element={<TourList/>}></Route>
            <Route path="/tour/:tourId" element={<TourDetails />} />
            <Route path="/tour/:tourId" element={<OrganizerDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
    </LoadScript>
  );
}

export default App;
