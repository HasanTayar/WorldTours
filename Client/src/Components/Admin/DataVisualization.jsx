import React, { useEffect, useState } from 'react';
import {Typography , Box} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartPie } from '@fortawesome/free-solid-svg-icons';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import { fetchAllUsers } from '../../Services/userService';
import { fetchAllOrders } from '../../Services/orderService';
import { fetchAllTours } from '../../Services/tourService';

const DataVisualization = () => {
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchAllUsers();
      const toursData = await fetchAllTours();
      const ordersData = await fetchAllOrders();

      setUsers(usersData);
      setTours(toursData);
      setOrders(ordersData);
    };

    fetchData();
  }, []);

  const approvedOrders = orders.filter((order) => order.approved);
  const unapprovedOrders = orders.filter((order) => !order.approved && !order.isCanceld);
  const cancelledOrders = orders.filter((order) => order.isCanceld);

  const totalApprovedPrice = approvedOrders.reduce((total, order) => total + order.price, 0);
  const totalUnapprovedPrice = unapprovedOrders.reduce((total, order) => total + order.price, 0);

  const approvedOrdersCount = approvedOrders.length;
  const unapprovedOrdersCount = unapprovedOrders.length;
  const cancelledOrdersCount = cancelledOrders.length;
  const organizerRequestCount = users.filter((user) => user.organizerRequest).length;

  const dataLine = [
    { name: 'Approved Orders', value: approvedOrdersCount },
    { name: 'Unapproved Orders', value: unapprovedOrdersCount },
    { name: 'Cancelled Orders', value: cancelledOrdersCount },
    { name: 'Organizer Requests', value: organizerRequestCount },
  ];

  const dataPie = [
    { name: 'Approved Orders', value: (totalApprovedPrice/(totalApprovedPrice + totalUnapprovedPrice)) * 100  },
    { name: 'Unapproved Orders', value: (totalUnapprovedPrice/(totalApprovedPrice + totalUnapprovedPrice)) * 100 },
  ];

  const COLORS = ['#8884d8', '#ff4d4f'];

  return (
    <div className="data-visualization">
      <Typography variant="h4" gutterBottom>Data Visualization</Typography>
      
      <Box className="chart-container">
        <Typography variant="h6" gutterBottom>
          <FontAwesomeIcon icon={faChartBar} className="icon" /> Data
        </Typography>
        <LineChart className="chart" width={800} height={300} data={dataLine}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </Box>
      
      <Box className="chart-container">
        <Typography variant="h6" gutterBottom>
          <FontAwesomeIcon icon={faChartPie} className="icon" /> Incomes (Percentage)
          <br></br>
          Future Total Incomes: {totalApprovedPrice + totalUnapprovedPrice}$
        </Typography>
        <PieChart className="chart" width={500} height={300}>
          <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </div>
  );
};

export default DataVisualization;
