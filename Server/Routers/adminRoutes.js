const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
// Route to get all users
router.get('/users', adminController.getAllUsers);

// Route to get all tours
router.get('/tours', adminController.getAllTours);

// Route to get all chat rooms
router.get('/chatrooms', adminController.getAllChatRooms);

// Route to get all orders
router.get('/orders', adminController.getAllOrders);

module.exports = router;
