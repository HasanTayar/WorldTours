import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "../../Pages/Home/Home";
import Verify from "../../Pages/Verify/verify";
import RegisterForm from "../../Pages/signUp/SignupForm";
import Login from "../../Pages/Login/Login";
import UpdateForgottenPassword from "../../Pages/ForgettenPasswords/updateForgetsPassword";
import Profile from "../../Pages/Profile/Profile";
import CreateTour from "../../Pages/CreateTour/CreateTour";
import ChatPage from "../../Pages/Chat/chat";
import TourList from "../../Pages/Tours/TourList";
import TourDetails from "../../Pages/Tours/TourDetails";
import Booking from "../../Pages/Booking/Booking";
import OrganizerDetails from "../Tour/OrganizerDetails";
import NotFound from "../../Pages/NotFound/NotFound";
import OrderHistory from "../../Pages/orderHistory/OrderHistory";
import EditTour from "../../Pages/EditTour/EditTour";
import About from "../../Pages/About/About";
import PaymentSuccess from "../../Pages/PaymentSuccess/PaymentSuccess";
import AdminDashboard from "../../Pages/Admin/AdminDashboard";
import UserManagement from "../Admin/UserManagement";
import AdminTours from "../Admin/AdminTours";
import ReviewPage from "../../Pages/Review/ReviewPage";
import AdminOrder from "../Admin/AdminOrder";
import AdminChat from "../Admin/AdminChat";
const AppRoutes = ({ isLoggedIn, user, setUser, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/users/verify/" element={<Verify />} />
      <Route path="/about" element={<About/>} />
      <Route path="/Payment-Success" element={<PaymentSuccess/>} />
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
        path="/chat/:userId"
        element={isLoggedIn ? <ChatPage user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/Booking/tour/:tourId"
        element={isLoggedIn ? <Booking /> : <Navigate to="/login" />}
      />
       <Route
        path="/Orders"
        element={isLoggedIn ? <OrderHistory user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/edit-tour/:tourId"
        element={isLoggedIn ? <EditTour/> : <Navigate to="/login"/>}
      />
       <Route
        path="/admin"
        element={isLoggedIn && user && user.isAdmin ? <AdminDashboard user={user}/> : <Navigate to="/login" />}
      />
       <Route
        path="/admin/users"
        element={isLoggedIn && user &&  user.isAdmin ? <UserManagement user={user}/> : <Navigate to="/login" />}
      />
       <Route
        path="/admin/tours"
        element={isLoggedIn && user &&  user.isAdmin ? <AdminTours /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/orders"
        element={isLoggedIn && user &&  user.isAdmin ? <AdminOrder admin={user} /> : <Navigate to="/login" />}
      />
        <Route
        path="/admin/chats"
        element={isLoggedIn && user &&  user.isAdmin ? <AdminChat user={user}/> : <Navigate to="/login" />}
      />
       <Route
        path="/reviews"
        element={isLoggedIn ? <ReviewPage /> : <Navigate to="/login" />}
      />
        
    </Routes>
    
  );
};

export default AppRoutes;
