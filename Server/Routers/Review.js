const express = require('express');
const router = express.Router();
const { sendReviewEmail, submitReview } = require('../Controllers/Review');

// Route to send the review email
router.post('/sendReviewEmail/:orderId', sendReviewEmail);

// Route to submit the review
router.post('/submitReview', submitReview);

module.exports = router;
