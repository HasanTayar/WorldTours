import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Verify from './Components/verify'
import RegisterForm from './Components/SignupForm';
import Login from './Pages/Login/Login';
import UpdateForgottenPassword from './Components/updateForgetsPassword';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import CreateTour from './Components/CreateTour';
import ChatPage from './Components/ChatClient';
import { LoadScript } from '@react-google-maps/api';
import TourList from './Components/TourList';
import TourDetails from './Components/TourDetails';
import OrganizerDetails from './Components/OrganizerDetails';
import Order from './Components/Order.jsx';
import { logout } from './Services/User/auth';
import { getToken } from './Services/Tokens/token';
const googleMapsApiKey = 'AIzaSyDhDzbFCa7X0FwHS3aBCFGIpg1coS8UdjE';
const libraries = ['places'];
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    const token = getToken();
    return token !== null;
  });
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <LoadScript
    googleMapsApiKey={googleMapsApiKey}
    libraries={libraries}
    onLoad={() => console.log('Google Maps API loaded')}
    onError={(error) => console.error('Error loading Google Maps API:', error)}
  >
    <Router>
      <div className="App">
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={() => logout(setIsLoggedIn, setUser)} />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/users/verify/" element={<Verify />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/users/reset-passwtoursord/" element={<UpdateForgottenPassword />} />
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} user={user}><Profile user={user} /></ProtectedRoute>} />
            <Route path="/add-new-tours/" element={<CreateTour user={user} />}></Route>
            <Route path="/chat/" element={<ChatPage currentUser={user}/>}></Route>
            <Route path="/tours/" element={<TourList/>}></Route>
            <Route path="/tour/:tourId" element={<TourDetails />} />
            <Route path="/tour/:tourId" element={<OrganizerDetails />} />
            <Route path="/Booking/tour/:tourId" element={<Order/>} />
          </Routes>
        </div>
      </div>
    </Router>
    </LoadScript>
  );
}

export default App;
