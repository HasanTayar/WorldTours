const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

router.post('/new-order', orderController.createOrder);
router.delete('/:orderId', orderController.cancelOrder);
router.get('/orders', orderController.fetchAllOrders);
router.patch('/:orderId/approve', orderController.approveOrder);
router.patch('/:orderId/cancel-organizer', orderController.cancelOrderOrganizer);

module.exports = router;
