const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  text: { type: String, required: true },
  rating: { type: mongoose.Schema.Types.Decimal128, required: true, min: 0, max: 5 },
  date: { type: Date, required: true, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
