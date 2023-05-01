import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, user, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
