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
  bio: { type: String },// for admin or orgainzer
  rating: { type: Decimal128 },
  location: String,// for admin or orgainzer
  languages: [String],// for admin or orgainzer
  toursOrganized: Number,// for  orgainzer depnds from tours schema
  pastTourLocations: [String],// for  orgainzer depnds from touors schema 
  upcomingTours: [// for  orgainzer depnds from tours schema 
    {
      location: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  reviews: [// for  orgainzer
  {
    reviewer: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Decimal128, required: true },
    date: { type: Date, required: true },
  },
],
  socialMediaLinks: {// for admin or orgainzer
    facebook: String,
    instagram: String,
    twitter: String,
  },
  certifications: [String],// for admin or orgainzer
  specialties: [String],// for admin or orgainzer
  contactInfo: {// for admin or orgainzer
    contactEmail: String,
    phone: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;