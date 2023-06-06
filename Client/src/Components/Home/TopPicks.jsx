import React, { useState } from "react";
import { Card, CardGroup, OverlayTrigger, Popover, PopoverHeader, PopoverBody, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopPicks = ({ topPicks }) => {
  const [visible, setVisible] = useState(4);  // Initially, 4 tours will be visible

  const showMoreTours = () => {
    setVisible((prevValue) => prevValue + 4);  // Each time the button is clicked, show 4 more tours
  };

  const popover = (tour) => (
    <Popover id="popover-basic">
      <PopoverHeader as="h3">{tour.name}</PopoverHeader>
      <PopoverBody>
        {tour.desc}<br></br>
        <b>Price:{tour.price}$</b>
      </PopoverBody>
    </Popover>
  );

  return (
    <div className="mb-4">
      <CardGroup>
        {topPicks.slice(0, visible).map((tour) => (
          <OverlayTrigger
            key={tour._id}
            trigger={['hover', 'focus']}
            placement="bottom"
            overlay={popover(tour)}
          >
            <Card key={tour._id}>
              <Link to={`/tour/${tour._id}`}>
                <Card.Img
                  variant="top"
                  src={tour.photoTimeline}
                  style={{ width: "100%", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title><p style={{fontSize:"15px"}}>{tour.name}</p></Card.Title>
                </Card.Body>
              </Link>
            </Card>
          </OverlayTrigger>
        ))}
      </CardGroup>
      { visible < topPicks.length && 
        <Button onClick={showMoreTours} className="mt-3">
          Show More
        </Button> 
      }
    </div>
  );
};

export default TopPicks;
