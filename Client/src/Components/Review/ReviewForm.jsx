import React, { useState } from 'react';
import { FormGroup, Label, Button, Input, Alert } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { submitReview } from '../../Services/reviewServices';
import './ReviewForm.css';

export default function ReviewForm({ hashedToken }) {
  const [tourText, setTourText] = useState("");
  const [tourRating, setTourRating] = useState(0);

  const [organizerText, setOrganizerText] = useState("");
  const [organizerRating, setOrganizerRating] = useState(0);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tourRes = await submitReview(hashedToken, tourText, tourRating);
    const organizerRes = await submitReview(hashedToken, organizerText, organizerRating);
    if (tourRes.data.message && organizerRes.data.message) {
      setMessage('Review submitted successfully');
    }
  };

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
            onChange={(e) => setTourText(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="tourRating">Tour Rating</Label>
          <StarRatings
            rating={tourRating}
            starRatedColor="yellowgreen"
            changeRating={setTourRating}
            numberOfStars={5}
            name='tourRating'
          />
        </FormGroup>

        <h2>Organizer Review</h2>
        <FormGroup>
          <Label for="organizerText">Organizer Review Text</Label>
          <Input
            type="textarea"
            name="organizerText"
            id="organizerText"
            value={organizerText}
            onChange={(e) => setOrganizerText(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="organizerRating">Organizer Rating</Label>
          <StarRatings
            rating={organizerRating}
            starRatedColor="yellowgreen"
            changeRating={setOrganizerRating}
            numberOfStars={5}
            name='organizerRating'
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
