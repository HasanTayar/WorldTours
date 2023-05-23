import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./OrganizerDetails.scss";
const OrganizerDetails = ({
  organizer,
  show,
  handleClose,
  handleCloseModal,
}) => {
  return (
    <div className="organizer-details">
      <p onClick={handleClose}>
        Organized by: {organizer.firstName} {organizer.lastName}
      </p>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Organizer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3">
            <img
              src={`${organizer.photo}`}
              alt={`${organizer.firstName} ${organizer.lastName}`}
              className="rounded-circle mr-3"
              style={{ width: "150px", height: "150px" }}
            />
            <div>
              <h4>
                {organizer.firstName} {organizer.lastName}
              </h4>
              <p>Email: {organizer.email}</p>
              <p>Phone: {organizer.phoneNumber}</p>
              <p>Rating: {parseFloat(organizer.rating).toFixed(1)}</p>
              {/* Add any other relevant details from your user schema */}
            </div>
          </div>
          <div>
            <p>
              Specialties:{" "}
              {organizer.specialties && organizer.specialties.join(", ")}
            </p>
            <p>
              Languages: {organizer.languages && organizer.languages.join(", ")}
            </p>
            <p>Current Location: {organizer.location}</p>
            {/* Add any other relevant details from your user schema */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" as={Link} to={`/chat/${organizer._id}`}>
            Contact Organizer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrganizerDetails;
