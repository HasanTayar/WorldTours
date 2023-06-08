import React, { useEffect, useState } from 'react';

import {Typography , Box} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartPie, faChartLine } from '@fortawesome/free-solid-svg-icons';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
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

  const approvedOrders = orders.filter((order) => order.aprroved);
  const unapprovedOrders = orders.filter((order) => !order.aprroved);

  const totalApprovedPrice = approvedOrders.reduce((total, order) => total + order.price, 0);
  const totalUnapprovedPrice = unapprovedOrders.reduce((total, order) => total + order.price, 0);
  const totalIncome = totalApprovedPrice - totalUnapprovedPrice;

  const approvedOrdersCount = approvedOrders.length;
  const unapprovedOrdersCount = unapprovedOrders.length;
  const organizers = users.filter((user) => user.isOrganizer);
  const organizerCount = organizers.length;

  const dataBar = [
    { name: 'Approved Orders', value: approvedOrdersCount },
    { name: 'Unapproved Orders', value: unapprovedOrdersCount },
    { name: 'Organizers', value: organizerCount },
  ];

  const dataPie = [
    { name: 'Approved Orders', value: totalApprovedPrice },
    { name: 'Unapproved Orders', value: totalUnapprovedPrice },
  ];

  const dataRadial = [
    { name: 'Income', value: totalIncome },
  ];

  const COLORS = ['#8884d8', '#ff4d4f'];

  return (
    <div className="data-visualization">
      <Typography variant="h4" gutterBottom>Data Visualization</Typography>
      
      <Box style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '0.5rem' }}>
        <Typography variant="h6" gutterBottom>
          <FontAwesomeIcon icon={faChartBar} className="icon" /> Data
        </Typography>
        <BarChart width={800} height={300} data={dataBar}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </Box>
      
      <Box style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '0.5rem' }}>
        <Typography variant="h6" gutterBottom>
          <FontAwesomeIcon icon={faChartPie} className="icon" /> Incomes
        </Typography>
        <PieChart width={500} height={300}>
          <Pie data={dataPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>

      <Box style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '0.5rem' }}>
        <Typography variant="h6" gutterBottom>
          <FontAwesomeIcon icon={faChartLine} className="icon" /> Profits
        </Typography>
        <Typography variant="subtitle1" gutterBottom>Total Price: ${totalIncome}</Typography>
        <RadialBarChart width={500} height={300} innerRadius="10%" outerRadius="80%" data={dataRadial} barSize={10}>
          <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background dataKey="value" />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={{ lineHeight: '24px' }} />
          <Tooltip />
        </RadialBarChart>
      </Box>
    </div>
  );
};

export default DataVisualization;
