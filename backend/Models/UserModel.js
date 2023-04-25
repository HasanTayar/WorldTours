const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photo: String,
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isOrganizer: { type: Boolean, default: false },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
  verificationCode: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  bio: { type: String },
  rating: { type: mongoose.Schema.Types.Decimal128, min: 0, max: 5 },
  location: String,
  languages: [String],
  toursOrganized: Number,
  pastTourLocations: [String],
  upcomingTours: [
    {
      location: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  reviews: [
    {
      reviewer: { type: String, required: true },
      text: { type: String, required: true },
      rating: { type: mongoose.Schema.Types.Decimal128, required: true, min: 0, max: 5 },
      date: { type: Date, required: true },
    },
  ],
  socialMediaLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
  },
  certifications: [String],
  specialties: [String],
  contactInfo: {
    contactEmail: String,
    phone: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
