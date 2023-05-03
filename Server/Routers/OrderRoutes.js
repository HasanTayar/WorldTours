const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');

router.post('/new-order', orderController.createOrder);
router.delete('/order/:orderId', orderController.cancelOrder);
router.get('/orders', orderController.fetchAllOrders);
router.patch('/orders/:orderId/approve', orderController.approveOrder);
router.patch('/orders/:orderId/cancel-organizer', orderController.cancelOrderOrganizer);

module.exports = router;
