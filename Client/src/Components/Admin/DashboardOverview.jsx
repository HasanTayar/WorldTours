import { Card, CardContent, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserShield, faCartShopping, faPlane } from '@fortawesome/free-solid-svg-icons';
import { useState , useEffect} from 'react';
import { fetchAllUsers } from '../../Services/userService';
import { fetchAllOrders } from '../../Services/orderService';
import { fetchAllTours } from '../../Services/tourService';
import './Dashboard.css';

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [tourCount, setTourCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [adminCount , setAdminCount] = useState(0);

  useEffect(() => {
    fetchAllUsers().then(users => {
      setUserCount(users.length);
      setAdminCount(users.filter(user => user.isAdmin).length);
    });
    fetchAllTours().then(tours => setTourCount(tours.length));
    fetchAllOrders().then(orders => setOrderCount(orders.length));
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-overview">
        <Card className="overview-card">
          <CardContent>
            <FontAwesomeIcon icon={faUsers} className="overview-icon" />
            <Typography className="overview-title">Users</Typography>
            <Typography className="overview-count">{userCount}</Typography>
          </CardContent>
        </Card>
        <Card className="overview-card">
          <CardContent>
            <FontAwesomeIcon icon={faUserShield} className="overview-icon" />
            <Typography className="overview-title">Admins</Typography>
            <Typography className="overview-count">{adminCount}</Typography>
          </CardContent>
        </Card>
        <Card className="overview-card">
          <CardContent>
            <FontAwesomeIcon icon={faCartShopping} className="overview-icon" />
            <Typography className="overview-title">Orders</Typography>
            <Typography className="overview-count">{orderCount}</Typography>
          </CardContent>
        </Card>
        <Card className="overview-card">
          <CardContent>
            <FontAwesomeIcon icon={faPlane} className="overview-icon" />
            <Typography className="overview-title">Tours</Typography>
            <Typography className="overview-count">{tourCount}</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
