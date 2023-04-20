// TourModel.js

const mongoose = require('mongoose');

const Decimal128 = mongoose.Types.Decimal128;

const TourSchema = new mongoose.Schema({
    organizerId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    photoTimeline: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    rating: { type: Decimal128 },
    orderCount: { type: Number, default: 0 },
    days: [
      {
        dayName: String,
        photo: String,
        location: String,
        desc: String,
      },
    ],
    locations: [
      {
        locationName: String,
        long: Number,
        lat: Number,
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });
  

const Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;
