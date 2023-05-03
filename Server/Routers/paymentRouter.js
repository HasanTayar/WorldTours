const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.get('/:userId/hasPaymentRef', paymentController.hasPaymentRef);
router.post('/addPaymentMethod', paymentController.addPaymentMethod);
router.delete('/delete/:cardId', paymentController.deltePaymentMethod);

module.exports = router;
