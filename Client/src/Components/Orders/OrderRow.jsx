import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { cancelOrder, deleteOrder } from "../../Services/orderService";
import "./OrderRow.scss";

const OrderRow = ({ order, user, handleApprove, handleCancel }) => {


 
  const handleCancelOrder = async () => {
    try {
      const response = await deleteOrder(order._id);
      if (response) {
        console.log('Order cancelled successfully');
      } else {
        console.log('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };
  
  const calculateEndDate = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate.toLocaleDateString();
  };
  return (
    <tr className="order-row">
      <td>{order.tourId.name}</td>
      {user.isOrganizer && (
        <td>
          {order.email} - {order.phone}
        </td>
      )}
      <td>{order.price}</td>
      {user.isOrganizer && (
        <td>{new Date(order.selectedDate).toLocaleDateString()}</td>
      )}
      {user.isOrganizer && (
        <td>{calculateEndDate(order.selectedDate, order.tourId.days)}</td>
      )}
      <td>
        {order.aprroved ? (
          <FontAwesomeIcon icon={faCheck} className="approved-icon" />
        ) : (
          <FontAwesomeIcon icon={faTimes} className="not-approved-icon" />
        )}
      </td>
      {user.isOrganizer && (
        <td>
          {!order.approved && (
            <>
              <Button
                className="approve-btn"
                onClick={() => handleApprove(order._id)}
              >
                Approve
              </Button>
              <Button
                className="cancel-btn"
                onClick={() => handleCancel(order._id)}
              >
                Cancel
              </Button>
            </>
          )}
        </td>
      )}
      {!user.isOrganizer && (
        <td>
          <Button
           variant="danger"
            onClick={handleCancelOrder}
          >
            Cancel
          </Button>
          
        </td>
      )}
    </tr>
  );
};

export default OrderRow;
