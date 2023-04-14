import { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/VerificationCode.css';

function VerificationCode(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6) {
      setVerificationCode(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (response.ok) {
        alert('Email verified');
        navigate('/login');
      } else {
        alert('Verification failed');
      }
    } catch (error) {
      console.error(error);
      alert('Verification failed');
    }
  };
  const resendVerificationCode = async () => {
    try {
      const response = await fetch('/api/resend-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('Verification code resent successfully');
      } else {
        alert('Failed to resend verification code');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to resend verification code');
    }
  };

  const changeEmail = async (newEmail) => {
    try {
      const response = await fetch('/api/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newEmail }),
      });

      if (response.ok) {
        alert('Email updated successfully');

      } else {
        alert(response.error);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update email');
    }
  };

  const toggleEmailForm = () => {
    setIsEmailFormVisible(!isEmailFormVisible);
  };

  const handleEmailChange = () => {
    if (newEmail === confirmNewEmail) {
      changeEmail(newEmail);
      setIsEmailFormVisible(false);
    } else {
      alert("Emails don't match.");
    }
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleConfirmNewEmailChange = (e) => {
    setConfirmNewEmail(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column align-items-center verification-code-container">
        <h2>Verify your email address</h2>
        <p>
          We've sent a verification code to {email}. Please enter the code below.
        </p>
        <div className="form-inline my-4">
          <input
            type="text"
            className="form-control verification-code-input"
            maxLength="6"
            value={verificationCode}
            onChange={handleChange}
            pattern="\d{6}"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mx-2">
            Submit
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={resendVerificationCode}
          >
            Didn't receive the code? Click here to resend.
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={toggleEmailForm}
          >
            <FontAwesomeIcon icon={faPencilAlt} /> Change email
          </button>
        </div>
        {isEmailFormVisible && (
          <div className="email-form">
            <h4>Change Email</h4>
            <input
              type="email"
              className="form-control my-2"
              placeholder="New email"
              value={newEmail}
              onChange={handleNewEmailChange}
            />
            <input
              type="email"
              className="form-control my-2"
              placeholder="Confirm new email"
              value={confirmNewEmail}
              onChange={handleConfirmNewEmailChange}
            />
            <button
              className="btn btn-primary"
              onClick={handleEmailChange}
            >
              Update Email
            </button>
          </div>
        )}
      </div>
    </form>
  );
  
}

export default VerificationCode;
