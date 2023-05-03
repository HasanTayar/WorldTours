import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import OrganizerDetails from "../Tour/OrganizerDetails";
import "./OrderRow.scss";

const OrderRow = ({ order, user, handleApprove, handleCancel }) => {
  const [showOrganizerDetails, setShowOrganizerDetails] = useState(false);

  const handleShowOrganizerDetails = () => {
    setShowOrganizerDetails(true);
  };

  const handleCloseOrganizerDetails = () => {
    setShowOrganizerDetails(false);
  };

  const calculateEndDate = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate.toLocaleDateString();
  };
  console.log(order.tourId.organizerId)
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
            className="contact-organizer-btn"
            onClick={handleShowOrganizerDetails}
          >
            Contact Organizer
          </Button>
          <OrganizerDetails
            organizer={order.tourId.organizerId}
            show={showOrganizerDetails}
            handleClose={handleCloseOrganizerDetails}
          />
        </td>
      )}
    </tr>
  );
};

export default OrderRow;
