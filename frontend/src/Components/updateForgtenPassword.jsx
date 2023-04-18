import '../css/UpdateForgottenPassword.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
const UpdateForgottenPassword = () => {
  const { search } = useLocation();
  const { token } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
 

  const updatePassword = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }
  
    try {
      const response = await axios.post('/api/reset-password', {
        token,
        newPassword,
      });
  
      console.table(response);
  
      setMessage(response.data.message);
      if (response.data.message === 'Password successfully reset. You can now log in with your new password.') {
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred while updating your password. Please try again.');
    }
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center my-4">Update Password</h1>
          <form onSubmit={updatePassword}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password:</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Password</button>
          </form>
          {message && <div className="mt-4 text-center">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default UpdateForgottenPassword;
