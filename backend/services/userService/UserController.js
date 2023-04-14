// UserController.js
const User = require('./UserModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Set up email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'HasanTayar1602@gmail.com',
    pass: 'atxlexkzjummenwy',
  },
});



exports.signup = async (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);

  try {
    const { email, firstName, lastName, password , phoneNumber } = req.body;
    const user = new User({
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      photo: req.file.filename, // add the filename to the user object
      verified: false,
    });
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: 'WorldTours@WorldTours.com',
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
        res.status(500).send({ message: 'Failed to send verification email' });
      } else {
        res.status(201).send(JSON.stringify({ message: 'User created and verification email sent' }));
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to create user' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'The Email already Exits!' });
    }

    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      user.verificationCode = undefined;
      await user.save();
      res.status(200).send({ message: 'Email verified successfully' });
    } else {
      res.status(400).send({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to verify email' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    if (!user.isVerified) {
      return res.status(400).send({ message: 'Email not verified' });
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

    res.status(200).send({ message: 'Login successful', token });
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
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update profile' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { userEmail } = req.params;

    const user = await User.findOne({ email: decodeURIComponent(userEmail) });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to get user details' });
  }
};

exports.setAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({ message: 'User granted admin privileges', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update user privileges' });
  }
}
exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: 'WorldTours@WorldTours.com',
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
        res.status(500).send({ message: 'Failed to send verification email' });
      } else {
        res.status(200).send({ message: 'Verification email resent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to resend verification code' });
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
      return res.status(404).send({ message: 'User not found' });
    }

    // Resend verification code to the new email
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    await user.save();

    const mailOptions = {
      from: 'WorldTours@WorldTours.com',
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
        res.status(500).send({ message: 'Failed to send verification email for the new email' });
      } else {
        res.status(200).send({ message: 'Email updated and verification email sent to new address' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to update email' });
  }
};

