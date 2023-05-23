require("dotenv").config();
const User = require("../Models/UserModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
//handle singup
exports.signup = async (req, res) => {
  try {
    const { email, firstName, lastName, password, phoneNumber, photo } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phoneNumber,
      photo: req.file ? `/userPhoto/${req.file.filename}` : photo,
      verified: false,
    });

    // Save the user and send a verification email
    const savedUser = await user.save();
    const verificationToken = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Configure the email
    const verificationEmail = {
      from: process.env.EMAIL_USER,
      to: savedUser.email,
      subject: "Please verify your email",
      html: `<p>Welcome to World Tours, ${savedUser.firstName}!</p>
             <p>To verify your email, please click on the link below:</p>
             <a href="${process.env.BASE_URL}/users/verify?token=${verificationToken}">Verify your email</a>`,
    };

    // Send the email
    await transporter.sendMail(verificationEmail);

    res
      .status(201)
      .send({
        message:
          "Account created successfully. Please check your email to verify your account.",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "An error occurred while creating your account. Please try again.",
      });
  }
};
//handle verfiy email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .send({ message: "JSON Web Token must be provided." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      res.status(404).send({ message: "User not found." });
    } else {
      res.status(200).send({ message: "Email successfully verified." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "An error occurred while verifying your email. Please try again.",
      });
  }
};

//handle login system
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      res.status(404).send({ message: "User not found." });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).send({ message: "Invalid email or password." });
      } else if (!user.isVerified) {
        // Send a new verification email to the user's email
        const verificationToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        const verificationEmail = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Please verify your email",
          html: `<p>Welcome to World Tours, ${user.firstName}!</p>
                 <p>To verify your email, please click on the link below:</p>
                 <a href="${process.env.BASE_URL}/users/verify?token=${verificationToken}">Verify your email</a>`,
        };

        await transporter.sendMail(verificationEmail);

        res
          .status(401)
          .send({
            message:
              "Email not verified. A new verification link has been sent to your email.",
          });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        res.status(200).send({ message: "Logged in successfully.", token });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message: "An error occurred while logging in. Please try again.",
      });
  }
};

//handle forgten password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ message: "User not found." });
    } else {
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetTokenExpiration;
      await user.save();

      const resetEmail = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password reset request",
        html: `<p>Hi ${user.firstName},</p>
               <p>You recently requested a password reset. Please click the link below to reset your password:</p>
               <a href="${process.env.BASE_URL}/users/reset-password?token=${resetToken}">Reset your password</a>
               <p>If you did not request a password reset, please ignore this email.</p>`,
      };

      await transporter.sendMail(resetEmail);

      res
        .status(200)
        .send({
          message: "Password reset email sent. Please check your email.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "An error occurred while sending the password reset email. Please try again.",
      });
  }
};

//handle restPassword
exports.resetPassword = async (req, res) => {
  try {
    console.log(req.body);
    const { token, newPassword } = req.body;

    // Check if newPassword is provided
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required." });
    }

    const user = await User.findOne({ resetPasswordToken: token });
    console.log("User:", user);

    if (!user) {
      console.log("!user:", 1);
      return res
        .status(400)
        .send({ message: "Password reset token is invalid or has expired." });
    } else {
      const now = new Date();
      const resetPasswordExpires = new Date(user.resetPasswordExpires);
      console.log(resetPasswordExpires);
      console.log(now < resetPasswordExpires);
      if (now > resetPasswordExpires) {
        console.log("!user:", 2);
        return res
          .status(400)
          .send({ message: "Password reset token is invalid or has expired." });
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("Hashed password:", hashedPassword);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res
          .status(200)
          .send({
            message:
              "Password successfully reset. You can now log in with your new password.",
          });
      }
    }
  } catch (error) {
    console.log("!user:", 3);
    console.error("Error in resetPassword function:", error);
    return res
      .status(500)
      .send({
        message:
          "An error occurred while resetting your password. Please try again.",
        errorDetails: error.message,
      });
  }
};

//to return user details
exports.getUserProfile = async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    console.log("getUserProfile userEmail:", userEmail);

    if (!userEmail) {
      return res.status(401).send({ message: "Unauthorized." });
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${userEmail}$`, "i") },
    });
    if (!user) {
      console.log("User not found");
      res.status(404).send({ message: "User not found." });
    } else {
      console.log("User found:", user);
      res.status(200).send(user);
    }
  } catch (error) {
    console.error("Error in getUserProfile function:", error);
    return res
      .status(500)
      .send({
        message:
          "An error occurred while fetching user data. Please try again.",
        errorDetails: error.message,
      });
  }
};

//to update user profile
exports.updateUserProfile = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = req.body;
    if (
      updatedData.photo &&
      typeof updatedData.photo === "object" &&
      Object.keys(updatedData.photo).length === 0
    ) {
      delete updatedData.photo;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//To delte user
exports.deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).send({ message: "User not found." });
    } else {
      res.status(200).send({ message: "User profile successfully deleted." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "An error occurred while deleting the user profile. Please try again.",
      });
  }
};
//to set user type admin
exports.setAdmin = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "User email is required." });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await User.setUserAsAdmin(user._id);

    res.status(200).json({ message: "User set as admin successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserByToken = async (req, res) => {
  console.log(req);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      res.status(404).send({ message: "User not found." });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message: "An error occurred while fetching the user. Please try again.",
      });
  }
};
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.isAdmin) {
      return res
        .status(403)
        .json({
          message:
            "Access forbidden. You must be an admin to access this resource.",
        });
    }

    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "An error occurred while checking the user role. Please try again.",
      });
  }
};
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true });
    res.status(200).send(admins);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message:
          "An error occurred while fetching the admins. Please try again.",
      });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message: "An error occurred while fetching users. Please try again.",
      });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: "User not found." });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        message: "An error occurred while fetching the user. Please try again.",
      });
  }
};


