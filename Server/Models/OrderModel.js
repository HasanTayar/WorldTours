const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  selectedDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit-card', 'paypal'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
