import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { fetchAllOrders, approveOrder, cancelOrder } from "../../Services/orderService";
import "./OrderHistory.scss";
import OrderRow from "../../Components/Orders/OrderRow";
const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await fetchAllOrders();
      setOrders(fetchedOrders);
    };
    fetchOrders();
  }, [orders]);

  const handleApprove = async (orderId) => {
    const approvedOrder = await approveOrder(orderId);
    if (approvedOrder) {
      setOrders(orders.orders.map((order) => (order._id === orderId ? approvedOrder : order)));
    }
    
  };

  const handleCancel = async (orderId) => {
    const canceledOrder = await cancelOrder(orderId);
if (canceledOrder) {
  setOrders(orders.orders.map((order) => (order._id === orderId ? canceledOrder : order)));
}

    
  };

  const calculateEndDate = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate.toLocaleDateString();
  };

  const userOrders = Array.isArray(orders.orders)
    ? orders.orders.filter((order) => user.isOrganizer ? order.tourId.organizerId === user._id : order.userId._id === user._id)
    : [];

    return (
      <div className="order-history">
        <h2>Order History</h2>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tour Name</th>
                {user.isOrganizer && <th>User Details</th>}
                <th>Price</th>
                {user.isOrganizer && <th>Start Date</th>}
                {user.isOrganizer && <th>End Date</th>}
                <th>Status</th>
                {user.isOrganizer && <th>Actions</th>}
                {!user.isOrganizer && <th>Cancel Order</th>}
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  user={user}
                  handleApprove={handleApprove}
                  handleCancel={handleCancel}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };


export default OrderHistory;
