import React, { useState } from "react";
import { Card, CardGroup, OverlayTrigger, Popover, PopoverHeader, PopoverBody, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NearbyTours = ({ nearbyTours }) => {
  const [visible, setVisible] = useState(4); // Initially, 4 tours will be visible

  const showMoreTours = () => {
    setVisible((prevValue) => prevValue + 4); // Each time the button is clicked, show 4 more tours
  };

  const popover = (tour) => (
    <Popover id="popover-basic">
      <PopoverHeader as="h3">{tour.name}</PopoverHeader>
      <PopoverBody>{tour.desc}</PopoverBody>
    </Popover>
  );

  if (nearbyTours.length === 0) {
    return null; // Don't render anything if nearbyTours array is empty
  }

  return (
    <div className="mb-4">
      <CardGroup>
        {nearbyTours.slice(0, visible).map((tour) => (
          <OverlayTrigger key={tour._id} trigger={['hover', 'focus']} placement="bottom" overlay={popover(tour)}>
            <Card key={tour._id}>
              <Link to={`/tour/${tour._id}`}>
                <Card.Img variant="top" src={tour.photoTimeline} style={{ width: "100%", height: "200px" }} />
                <Card.Body>
                  <Card.Title>{tour.name}</Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </OverlayTrigger>
        ))}
      </CardGroup>
      {visible < nearbyTours.length && (
        <Button onClick={showMoreTours} className="mt-3">
          Show More
        </Button>
      )}
    </div>
  );
};

export default NearbyTours;
