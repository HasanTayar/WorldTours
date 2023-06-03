const mongoose = require('mongoose');



const tourSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  photoTimeline: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  price:{type: String , required : true },
  rating: { type: mongoose.Schema.Types.Decimal128, min: 0, max: 5 },
  orderCount: { type: Number, default: 0 },
  days: [
    {
      dayName: String,
      photo: [String],
      desc: String,
    },
  ],
  tags:[String],
  locations: [
    {
      locationName: String,
      long: Number,
      lat: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },

});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
