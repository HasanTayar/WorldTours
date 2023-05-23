const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

// Create new Order
router.post('/new-order', orderController.createOrder);
// Delete Order
router.delete('/:orderId', orderController.deleteOrder);
// Get all Orders
router.get('/orders', orderController.fetchAllOrders);
// Approve Order
router.patch('/:orderId/approve', orderController.approveOrder);
// Cancel Order by Organizer
router.patch('/:orderId/cancel-organizer', orderController.cancelOrderOrganizer);

module.exports = router;
