import React, { useState, useEffect } from "react";
import { fetchAllOrders, approveOrder, cancelOrder } from '../../Services/orderService';
import { Card, CardBody, CardTitle, Button, Badge, Row, Col } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const allOrders = await fetchAllOrders();
      setOrders(allOrders.filter(order => order.userId._id === user._id || order.tourId.organizerId === user._id));
    };
    getOrders();
  }, [user._id]);
  

  const handleApprove = async (id) => {
    const updatedOrder = await approveOrder(id);
    if (updatedOrder) {
      const allOrders = await fetchAllOrders();
      setOrders(allOrders.filter(order => order.tourId.organizerId === user._id && !order.isCanceld));

    }

}

const handleCancel = async (id) => {
    const updatedOrder = await cancelOrder(id);
    if (updatedOrder) {
      const allOrders = await fetchAllOrders();
      setOrders(allOrders.filter(order => order.tourId.organizerId === user._id && !order.isCanceld));
    }
}
console.log(orders);

return (
  <div>
    <h1>Order History</h1>
    <Row>
      {orders.map(order => (
        <Col md={4} key={order._id}>
          <Card style={{minWidth:"300px"}}>
            <CardBody>
              <CardTitle tag="h5">{order.tourId.name}</CardTitle>
              <p>{`Order ID: ${order._id}`}</p>
              <p>{`Coustmer: ${order.userId.firstName} ${order.userId.lastName}`}</p>
          
              <p>{`Price: ${order.price}`}</p><br></br>
              <p>{`Approved: ${order.aprroved ? "Yes" : "No"}`}</p>
              {order.aprroved ? <FaCheckCircle /> : <FaTimesCircle />}
              {order.isDone && <Badge color="success">Done</Badge>}
              {user.isOrganizer &&
                <div>
                  <Button color="success" onClick={() => handleApprove(order._id)}>Approve</Button>
                  <Button color="danger" onClick={() => handleCancel(order._id)}>Cancel</Button>
                </div>
              }
              {!user.isOrganizer === "normal" && order.userId._id === user._id && !order.isDone &&
                <Button color="danger" onClick={() => handleCancel(order._id)}>Cancel</Button>
              }
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

};

export default OrderHistory;
