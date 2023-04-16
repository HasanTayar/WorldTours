// UserController.js
require('dotenv').config();
const User = require('./UserModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Set up email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


exports.signup = async (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
  try {
    const { email, firstName, lastName, password , phoneNumber , photo} = req.body;
    const user = new User({
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      photo: req.file ? req.file.filename : photo,
      verified: false,
    });
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    try {
      await user.save();
      const mailOptions = {
        from: 'WorldTours <HasanTayar1602@gmail.com>',
        to: user.email,
        subject: 'Email Verification',
        html: `
          <div style="background-color: #f2f2f2; padding: 20px;">
            <h1 style="color: #333;">Email Verification</h1>
            <p style="color: #555;">Hi ${firstName} ${lastName},</p>
            <p style="color: #555;">Please use the following code to verify your email:</p>
            <p style="color: #333; font-size: 24px;"><strong>${verificationCode}</strong></p>
            <p style="color: #555;">Thank you for joining World Tours!</p>
          </div>
        `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'An error occurred while sending the verification email. Please try again.' });
        } else {
          res.status(201).send(JSON.stringify({ message: 'Your account has been created successfully. Please check your email for a verification code.' }));
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'An error occurred while creating your account. Please try again.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while creating your account. Please try again.' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'Email not found. Please check the email address you entered.' });
    }

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      user.verificationCode = undefined;
      await user.save();
      res.status(200).send({ message: 'Email verified successfully' });
    } else {
      res.status(400).send({ message: 'The verification code you entered is incorrect. Please check your email and try again.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while verifying your email. Please try again.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'The email address you entered is not associated with any account. Please check the email address and try again.' });
    }
  
    const isPasswordValid = await user.comparePassword(password);
  
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'The password you entered is incorrect. Please try again.' });
    }
  
    if (!user.isVerified) {
      return res.status(400).send({ message: 'Your email has not been verified. Please verify your email before logging in.' });
    }

    // Generate and send token for authentication using JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    // Prepare the user object without password and other sensitive information
    const userToSend = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      isOrganizer: user.isOrganizer,
      isAdmin: user.isAdmin,
      photo: user.photo,
      isVerified: user.isVerified
    };

    res.status(200).send({ message: 'Login successful', token, user: userToSend });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to log in' });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { userId, ...updateFields } = req.body;

    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(updateFields.password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!user) {
      return res.status(404).send({ message: 'The user you are trying to update was not found. Please check your information and try again.' });
    }

    // Check if the password needs to be updated
    if (updateFields.newPassword) {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(updateFields.newPassword, salt);
      await User.findByIdAndUpdate(userId, { password: newPassword });
    }

    res.status(200).send({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while updating your profile. Please try again.' });
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const { userEmail } = req.params;

    const user = await User.findOne({ email: decodeURIComponent(userEmail) });

    if (!user) {
      return res.status(404).send({ message: 'The user you are looking for was not found. Please check the email address and try again.' });
    }
  
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while fetching the user details. Please try again.' });
  }
};

exports.setAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true });

    if (!user) {
      return res.status(404).send({ message: 'The user you are trying to grant admin privileges to was not found. Please check your information and try again.' });
    }
  
    res.status(200).send({ message: 'User granted admin privileges', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while updating user privileges. Please try again.' });
  }
}
exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'The user you are trying to resend the verification code to was not found. Please check the email address and try again.' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: 'WorldTours <HasanTayar1602@gmail.com>',
      to: user.email,
      subject: 'Email Verification - Resend',
      html: `
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #333;">Email Verification</h1>
          <p style="color: #555;">Hi ${user.firstName} ${user.lastName},</p>
          <p style="color: #555;">Here's your new verification code:</p>
          <p style="color: #333; font-size: 24px;"><strong>${verificationCode}</strong></p>
          <p style="color: #555;">Thank you for joining World Tours!</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while resending the verification email. Please try again.' });
      } else {
        res.status(200).send({ message: 'Verification email resent successfully. Please check your email for the new verification code.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while resending the verification code. Please try again.' });
  }
  
};

exports.updateEmail = async (req, res) => {
  try {
    const { userId, newEmail } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { email: newEmail, isVerified: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ message: 'The user you are trying to update the email for was not found. Please check your information and try again.' });
    }

    // Resend verification code to the new email
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

      const mailOptions = {
        from: 'WorldTours <HasanTayar1602@gmail.com>',
        to: user.email,
        subject: 'Email Verification - New Email',
        html: `
          <div style="background-color: #f2f2f2; padding: 20px;">
            <h1 style="color: #333;">Email Verification</h1>
            <p style="color: #555;">Hi ${user.firstName} ${user.lastName},</p>
            <p style="color: #555;">You've changed your email address. Please verify your new email using the following code:</p>
            <p style="color: #333; font-size: 24px;"><strong>${verificationCode}</strong></p>
            <p style="color: #555;">Thank you for updating your email address!</p>
          </div>
        `,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while sending the verification email for the new address. Please try again.' });
      } else {
        res.status(200).send({ message: 'Email updated successfully. A verification email has been sent to your new email address. Please check your email and verify the new address.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while updating your email. Please try again.' });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log("User Details:",user);
    if (!user) {
      return res.status(404).send({ message: 'The email address you entered is not associated with any account. Please check the email address and try again.' });
    }

    // Generate a unique password reset token
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    console.log(resetPasswordToken)
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
    console.log("user iD is:", user._id);
    // Update the user's resetPasswordToken and resetPasswordExpires fields in the database
    await User.findByIdAndUpdate(user._id, { resetPasswordToken, resetPasswordExpires });
    // Send an email with the password reset link to the user
    const passwordResetURL = `http://localhost:3000/reset-password?token=${resetPasswordToken}`;
    const mailOptions = {
      from: 'WorldTours <HasanTayar1602@gmail.com>',
      to: user.email,
      subject: 'Password Reset',
      html: `
        <div style="background-color: #f2f2f2; padding: 20px;">
          <h1 style="color: #333;">Password Reset</h1>
          <p style="color: #555;">Hi ${user.firstName} ${user.lastName},</p>
          <p style="color: #555;">You requested to reset your password. Please click the link below to reset your password:</p>
          <a href="${passwordResetURL}" style="color: #333; font-size: 24px;"><strong>Reset Password</strong></a>
          <p style="color: #555;">If you did not request a password reset, please ignore this email.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while sending the password reset email. Please try again.' });
      } else {
        res.status(200).send({ message: 'A password reset link has been sent to your email.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while resetting your password. Please try again.' });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    console.log("token:",token);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("password",password);
    console.log("date:",{$gt : Date.now()})
    console.log(user);
    if (!user) {
      return res.status(400).send({ message: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).send({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while resetting your password. Please try again.' });
  }
};




