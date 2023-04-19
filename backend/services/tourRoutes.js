const express = require('express');
const router = express.Router();
const TourController = require('./ToursController');
const passport = require('passport');

router.post('/create-tour', passport.authenticate('jwt', { session: false }), TourController.createTour);
router.get('/tours', TourController.getAllTours);
router.get('/tour/:tourId', TourController.getTourById);
router.put('/tour/:tourId', passport.authenticate('jwt', { session: false }), TourController.updateTourById);
router.delete('/tour/:tourId', passport.authenticate('jwt', { session: false }), TourController.deleteTourById);
router.get('/tours/nearby', TourController.getToursByLocation);

module.exports = router;
