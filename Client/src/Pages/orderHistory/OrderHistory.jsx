import React, { useState, useEffect } from "react";
import {
  fetchAllOrders,
  approveOrder,
  cancelOrderTours,
  cancelOrder,
} from "../../Services/orderService";
import { fetchUserById } from "../../Services/userService";
import { Card, CardBody, CardTitle, Button, Badge, Row, Col } from "reactstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [organizerDetails, setOrganizerDetails] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      const allOrders = await fetchAllOrders();
      setOrders(
        allOrders.filter(
          (order) =>
            order.userId._id === user._id ||
            order.tourId.organizerId === user._id
        )
      );
    };
    getOrders();
  }, [user._id]);

  useEffect(() => {
    const fetchOrganizerDetails = async () => {
      const fetchedDetails = {};
      for (const order of orders) {
        if (
          order.tourId.organizerId &&
          !(order.tourId.organizerId in fetchedDetails)
        ) {
          const organizer = await fetchUserById(order.tourId.organizerId);
          fetchedDetails[order.tourId.organizerId] = organizer; // Storing the whole organizer object
        }
      }
      setOrganizerDetails(fetchedDetails);
      console.log(fetchedDetails)
    };

    fetchOrganizerDetails();
  }, [orders]);

  useEffect(() => {
    const getOrders = async () => {
      const allOrders = await fetchAllOrders();
      setOrders(
        allOrders.filter(
          (order) =>
            order.userId._id === user._id ||
            order.tourId.organizerId === user._id
        )
      );
    };
    getOrders();
  }, [user._id]);

  const handleApprove = async (id) => {
    const updatedOrder = await approveOrder(id);
    if (updatedOrder) {
      const allOrders = await fetchAllOrders();
      setOrders(
        allOrders.filter(
          (order) => order.tourId.organizerId === user._id && !order.isCanceld
        )
      );
    }
  };

  const handleRegularUserCancel = async (id) => {
    const updatedOrder = await cancelOrderTours(id);
    if (updatedOrder) {
      const allOrders = await fetchAllOrders();
      setOrders(
        allOrders.filter(
          (order) => order.userId._id === user._id && !order.isCanceld
        )
      );
    }
  };

  const handleOrganizerCancel = async (id) => {
    const updatedOrder = await cancelOrder(id);
    if (updatedOrder) {
      const allOrders = await fetchAllOrders();
      setOrders(
        allOrders.filter(
          (order) => order.tourId.organizerId === user._id && !order.isCanceld
        )
      );
    }
  };

  return (
    <div>
      <h1>Order History</h1>
      <Row>
        {orders
          .filter((order) => (user.isOrganizer ? true : !order.isCanceld))
          .map((order) => (
            <Col md={4} key={order._id}>
              <Card style={{ minWidth: "300px" }}>
                <CardBody>
                  <CardTitle tag="h5">{order.tourId.name}</CardTitle>
                  {!user.isOrganizer && organizerDetails[order.tourId.organizerId] && (
  <>
    <p>{`Organizer: ${organizerDetails[order.tourId.organizerId].firstName || ""} ${organizerDetails[order.tourId.organizerId].lastName || ""}`}</p>
    <p>{`Email: ${organizerDetails[order.tourId.organizerId]?.email}`}</p>
    <p>{`Phone: ${organizerDetails[order.tourId.organizerId]?.phoneNumber}`}</p>
  </>
)}


                  {user.isOrganizer && (
                    <>
                      <p>{`Customer: ${order.userId.firstName} ${order.userId.lastName}`}</p>
                      <p>{`Email: ${order.userId.email}`}</p>
                      <p>{`Phone: ${order.userId.phoneNumber}`}</p>
                      {!order.isCanceld && (
                        <div>
                          <Button
                            color="success"
                            onClick={() => handleApprove(order._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => handleOrganizerCancel(order._id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                  <p>{`Price: ${user.isOrganizer ? (order.price * 0.95).toFixed(2) : order.price}`}</p>
                  <p>{`Approved: ${order.aprroved ? "Yes" : "No"}`}</p>
                  {order.aprroved ? <FaCheckCircle /> : <FaTimesCircle />}
                  <br />
                  {!user.isOrganizer && !order.isDone && (
                    <Button
                      color="danger"
                      onClick={() => handleRegularUserCancel(order._id)}
                    >
                      Cancel
                    </Button>
                  )}
                  {order.isDone && <Badge color="success">Done</Badge>}
                  {order.isCanceld && <Badge color="danger">Cancelled</Badge>}
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default OrderHistory;
