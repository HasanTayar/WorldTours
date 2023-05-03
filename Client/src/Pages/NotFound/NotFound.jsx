import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className="not-found d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="display-4">Page Not Found</h1>
        <p>
          Redirecting to the home page in{' '}
          <span className="countdown">{countdown}</span> seconds.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
