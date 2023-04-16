const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, default: null },
  isOrganizer: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  photo: { type: String },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set token expiration to 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
