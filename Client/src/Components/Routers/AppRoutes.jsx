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
import Order from "../../Pages/Order/Order.jsx";
import OrganizerDetails from "../Tour/OrganizerDetails";

const AppRoutes = ({ isLoggedIn, user , setUser , setIsLoggedIn}) => {
  return (
    <Routes>
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
      <Route path="/tours/" element={<TourList />} />
      <Route path="/tour/:tourId" element={<TourDetails />} />
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
        element={isLoggedIn ? <Order /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
