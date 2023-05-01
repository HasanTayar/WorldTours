const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderController');
const passport = require('passport');
router.post('/order', passport.authenticate('jwt', { session: false }), orderController.createOrder);

module.exports = router;
