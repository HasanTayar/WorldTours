const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Order = require('../Models/OrderModel');
const Review = require('../Models/Review');
const Tour = require('../Models/TourModel');
const User = require('../Models/UserModel');
const cron = require('node-cron');
const { addDays } = require('date-fns');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createReviewToken = async (userId, orderId) => {
  const token = jwt.sign({ userId, orderId }, process.env.JWT_SECRET, {
    expiresIn: '48h',
  });

  const hashedToken = await bcrypt.hash(token, 12);

  return { token, hashedToken };
};

exports.scheduleReviewEmails = () => {
    console.log("func is worked");
  cron.schedule('0 * * * *', async () => {
    const orders = await Order.find({ approved: true, isDone: false });

    for (const order of orders) {
      const endDate = addDays(order.selectedDate, order.tourId.days.length);
        console.log(order);
      if (endDate <= new Date()) {
        try {
          this.sendReviewEmail({ params: { orderId: order._id } }, null, null);
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
};

exports.sendReviewEmail = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('tourId userId');

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  const endDate = new Date(order.selectedDate);
  endDate.setDate(endDate.getDate() + order.tourId.days.length);

  if (endDate > new Date()) {
    res.status(400);
    throw new Error('The tour is not finished yet');
  }

  const { token, hashedToken } = await createReviewToken(
    order.userId._id,
    orderId
  );

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: order.userId.email,
    subject: 'Tour Review Invitation',
    text: `Your tour has ended. You can leave a review using this link: ${process.env.BASE_URL}/reviews/${hashedToken}`,
  });

  order.isDone = true;
  await order.save();

  if (res) {
    res.json({ message: 'Email sent' });
  }
});

exports.submitReview = asyncHandler(async (req, res, next) => {
  const { hashedToken, text, rating } = req.body;
  const decodedToken = jwt.verify(bcrypt.compareSync(hashedToken, token) && token, process.env.JWT_SECRET);

  if (!decodedToken) {
    res.status(401);
    throw new Error('Invalid or expired review token');
  }

  const { userId, orderId } = decodedToken;
  const order = await Order.findById(orderId).populate('tourId userId');

  if (!order || !order.isDone) {
    res.status(400);
    throw new Error('The tour is not finished yet or order not found');
  }

  const review = await Review.create({
    userId,
    tourId: order.tourId._id,
    text,
    rating,
  });

  order.tourId.reviews.push(review);
  await order.tourId.save();

  order.userId.reviews.push(review);
  await order.userId.save();

  res.json({ message: 'Review submitted' });
});
