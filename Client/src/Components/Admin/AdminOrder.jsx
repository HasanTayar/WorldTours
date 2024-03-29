import { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserShield } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { fetchAllOrders, cancelOrderTours as apiCancelOrder } from '../../Services/orderService';
import './AdminOrder.css';
import { fetchUserById } from '../../Services/userService';

const AdminOrder = ({ admin }) => { 
  const [activeTab, setActiveTab] = useState('1');
  const [orders, setOrders] = useState([]);
  const [organizerNames, setOrganizerNames] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
    };

    const fetchOrganizerNames = async () => {
      const fetchedNames = {};
      for (const order of orders) {
        if (order.tourId.organizerId && !(order.tourId.organizerId in fetchedNames)) {
          const user = await fetchUserById(order.tourId.organizerId);
          fetchedNames[order.tourId.organizerId] = user.firstName + " " + user.lastName;
        }
      }
      setOrganizerNames(fetchedNames);
    };

    fetchOrders();
    fetchOrganizerNames();
  }, [orders]);

  const adminOrders = Array.isArray(orders)
    ? orders.filter((order) => order.userId._id === admin._id && !order.isCanceld)
    : [];

  const userOrders = Array.isArray(orders)
    ? orders.filter((order) => order.userId._id )
    : [];

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const handleCancel = async (orderId) => {
    await apiCancelOrder(orderId);
    setOrders(orders.filter(order => order._id !== orderId));
  }

  return (
    <div className="admin-order">
      <h2>Admin Order</h2>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <FontAwesomeIcon icon={faUserShield} /> Admin Orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <FontAwesomeIcon icon={faUsers} /> User Orders
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Tour Name</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Price</th>
                    <th>Selected Date</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.tourId.name}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>{order.price}</td>
                      <td>{new Date(order.selectedDate).toLocaleDateString()}</td>
                      <td><Button color="danger" onClick={() => handleCancel(order._id)}>Cancel</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Tour Name</th>
                    <th>Organizer</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Price</th>
                    <th>Selected Date</th>
                    <th>Canceld</th>
                    <th>Approved</th>
                    <th>Done</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.tourId.name}</td>
                      <td>{organizerNames[order.tourId.organizerId]}</td>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>{order.price}</td>
                      <td>{new Date(order.selectedDate).toLocaleDateString()}</td>
                      <td>{order.isCanceld ? 'Yes' : 'No'}</td>
                      <td>{order.aprroved ? 'Yes' : 'No'}</td>
                      <td>{order.isDone ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AdminOrder;
