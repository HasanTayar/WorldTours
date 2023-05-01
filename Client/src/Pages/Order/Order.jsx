import { useState, useEffect , useRef} from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import './order.scss';

const Order = () => {
  const location = useLocation();
  const tourId = useRef('');
  const selectedDate = useRef('');
  const price = useRef('');
  const tourDays = useRef('');
  const [tour, setTour] = useState({});
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Payment processed successfully');
  };
//To get the parm from the url
  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (!query.tourId || !query.selectedDate || !query.price) {
      console.error('One or more required query parameters are missing.');
      return;
    }

    const date = new Date(query.selectedDate);

    if (isNaN(date.getDate())) {
      console.error('Invalid date format.');
      return;
    }

    tourId.current = query.tourId;
    selectedDate.current = date;
    price.current = query.price;
    tourDays.current = query.tourDays;
  }, [location]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/getLoginInUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [token]);

  return (
    <div className="order-page">
      <form onSubmit={handleSubmit}>
        <h2>{tour.name}</h2>
        <ul>
          <li>Start date: {selectedDate .current && new Date(selectedDate.current).toLocaleDateString()}</li>
          <li>End date: {selectedDate.current && new Date(selectedDate.current.getTime() + (tourDays.current - 1) * 86400000).toLocaleDateString()}</li>
          <li>Price: {price.current}$</li>
        </ul>
        <div className="mb-3">
          <label htmlFor="payment-method" className="form-label">Payment Method:</label>
          <select
            name="payment-method"
            id="payment-method"
            value={0}
            className="form-select"
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button type='sumbit'>Sumbit Ordder</button>
        </form>
        </div>
  );
};
  
export default Order;

