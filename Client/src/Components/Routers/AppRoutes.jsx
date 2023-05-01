import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import Verify from '../../Pages/Verify/verify';
import RegisterForm from '../../Pages/signUp/SignupForm';
import Login from '../../Pages/Login/Login';
import UpdateForgottenPassword from '../../Pages/ForgettenPasswords/updateForgetsPassword';
import Profile from '../../Pages/Profile/Profile';
import ProtectedRoute from '../../Components/Routers/ProtectedRoute';
import CreateTour from '../../Pages/CreateTour/CreateTour';
import ChatPage from '../../Components/ChatClient';
import TourList from '../../Pages/Tours/TourList';
import TourDetails from '../../Pages/Tours/TourDetails';
import Order from '../../Pages/Order/Order.jsx';
import OrganizerDetails from '../Tour/OrganizerDetails';

const AppRoutes = ({ isLoggedIn, user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/users/verify/" element={<Verify />} />
      <Route path="/login" element={<Login setIsLoggedIn={isLoggedIn} setUser={user} />} />
      <Route path="/users/reset-passwtoursord/" element={<UpdateForgottenPassword />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} user={user}>
            <Profile user={user} />
          </ProtectedRoute>
        }
      />
      <Route path="/add-new-tours/" element={<CreateTour user={user} />} />
      <Route path="/chat/" element={<ChatPage currentUser={user} />} />
      <Route path="/tours/" element={<TourList />} />
      <Route path="/tour/:tourId" element={<TourDetails />} />
      <Route path="/tour/:tourId" element={<OrganizerDetails />} />
      <Route path="/Booking/tour/:tourId" element={<Order />} />
    </Routes>
  );
};

export default AppRoutes;
