import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Verify from "../../Pages/Verify/verify";
import RegisterForm from "../../Pages/signUp/SignupForm";
import Login from "../../Pages/Login/Login";
import UpdateForgottenPassword from "../../Pages/ForgettenPasswords/updateForgetsPassword";
import Profile from "../../Pages/Profile/Profile";
import CreateTour from "../../Pages/CreateTour/CreateTour";
import ChatPage from "../../Components/ChatClient";
import TourList from "../../Pages/Tours/TourList";
import TourDetails from "../../Pages/Tours/TourDetails";
import Booking from "../../Pages/Booking/Booking";
import OrganizerDetails from "../Tour/OrganizerDetails";
import NotFound from "../../Pages/NotFound/NotFound";
import OrderHistory from "../../Pages/orderHistory/OrderHistory";
const AppRoutes = ({ isLoggedIn, user, setUser, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/users/verify/" element={<Verify />} />
      <Route
        path="/login"
        element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
      />

      <Route
        path="/users/reset-password/"
        element={<UpdateForgottenPassword />}
      />
      <Route path="/tours/" element={<TourList user={user} />} />
      <Route path="/tour/:tourId" element={<TourDetails isLoggedIn={isLoggedIn}  user={user}/>} />
      <Route path="/tour/:tourId" element={<OrganizerDetails />} />
      <Route
        path="/profile"
        element={
          isLoggedIn ? <Profile user={user} /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/add-new-tours/"
        element={
          isLoggedIn ? <CreateTour user={user} /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/chat/"
        element={
          isLoggedIn ? (
            <ChatPage currentUser={user} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/Booking/tour/:tourId"
        element={isLoggedIn ? <Booking /> : <Navigate to="/login" />}
      />
       <Route
        path="/Orders"
        element={isLoggedIn ? <OrderHistory user={user} /> : <Navigate to="/login" />}
      />
    </Routes>
    
  );
};

export default AppRoutes;
