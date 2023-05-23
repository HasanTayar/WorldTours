const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

// Get Payment Reference
router.get('/:userId/hasPaymentRef', paymentController.hasPaymentRef);
// Add Payment Method
router.post('/addPaymentMethod', paymentController.addPaymentMethod);
// Delete Payment Method
router.delete('/delete/:cardId', paymentController.deltePaymentMethod);

module.exports = router;
