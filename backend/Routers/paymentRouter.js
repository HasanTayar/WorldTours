const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.get('/user/:userId/hasPaymentRef', paymentController.hasPaymentRef);
router.post('/addPaymentMethod', paymentController.addPaymentMethod);

module.exports = router;
