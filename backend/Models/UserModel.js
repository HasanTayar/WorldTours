// models/User.js
const mongoose  = require('mongoose');
const { Decimal128 } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photo: String,
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isOrganizer: { type: Boolean, default: false },
  verificationCode: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  bio: { type: String },
  rating: { type: Decimal128 },
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
      reviewer: String,
      text: String,
      rating: Number,
      date: Date,
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
    email: String,
    phone: String,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;