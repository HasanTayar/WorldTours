import React, { useState } from 'react';
import { FormGroup, Label, Button, Input, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { submitReview } from '../../Services/reviewServices';
import './ReviewForm.css'; 

export default function ReviewForm({ hashedToken }) {

  const [tourText, setTourText] = useState("");
  const [tourRating, setTourRating] = useState(0);

  const [organizerText, setOrganizerText] = useState("");
  const [organizerRating, setOrganizerRating] = useState(0);

  const [message, setMessage] = useState(""); 

  const handleSubmit = async e => {
    e.preventDefault();
    const tourRes = await submitReview(hashedToken, tourText, tourRating);
    const organizerRes = await submitReview(hashedToken, organizerText, organizerRating);
    if(tourRes.data.message && organizerRes.data.message) {
      setMessage('Review submitted successfully');
    }
  }

  const createRating = (rating, setRating) => {
    let ratingArray = [];
    for (let i = 0; i < 5; i++) {
      ratingArray.push(
        <FontAwesomeIcon
          icon={faStar}
          key={i}
          className="star" // <- added CSS class
          onClick={() => setRating(i+1)}
          color={i < rating ? 'gold' : 'grey'}
        />
      )
    }
    return ratingArray;
  }

  return (
    <div className="review-form"> 
      {message && <Alert color="success">{message}</Alert>} 
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h2>Tour Review</h2>
        <FormGroup>
          <Label for="tourText">Tour Review Text</Label>
          <Input
            type="textarea"
            name="tourText"
            id="tourText"
            value={tourText}
            onChange={e => setTourText(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="tourRating">Tour Rating</Label>
          <div className="rating"> {/* <- added CSS class */}
            {createRating(tourRating, setTourRating)}
          </div>
        </FormGroup>

        <h2>Organizer Review</h2>
        <FormGroup>
          <Label for="organizerText">Organizer Review Text</Label>
          <Input
             type="textarea"
            name="organizerText"
            id="organizerText"
            value={organizerText}
            onChange={e => setOrganizerText(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="organizerRating">Organizer Rating</Label>
          <div className="rating"> {/* <- added CSS class */}
            {createRating(organizerRating, setOrganizerRating)}
          </div>
        </FormGroup>

        <Button color="primary" type="submit">Submit</Button>
      </form>
    </div>
  );
}
