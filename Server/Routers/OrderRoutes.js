const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');
router.post('/cancel/:orderId', orderController.cancelOrder);
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
// Get all booked dates for a tour
router.get('/tours/:tourId/booked-dates', orderController.fetchBookedDatesForTour);

module.exports = router;
