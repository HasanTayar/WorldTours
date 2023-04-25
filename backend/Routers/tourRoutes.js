const express = require('express');
const router = express.Router();
const TourController = require('../Controllers/ToursController');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const toursPhotosPath = '../frontend/public/toursPhotos';
      cb(null, toursPhotosPath);
    },
    filename: function (req, file, cb) {
      const { tourId } = req.params;
      const fileName = `${tourId}-${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  });
const upload = multer({ storage: storage });

router.post('/create-tour', passport.authenticate('jwt', { session: false }), upload.any(), TourController.createTour);

router.get('/tours', TourController.getAllTours);
router.get('/tour/:tourId', TourController.getTourById);
router.put('/tour/:tourId', passport.authenticate('jwt', { session: false }), TourController.updateTourById);
router.delete('/tour/:tourId', passport.authenticate('jwt', { session: false }), TourController.deleteTourById);
router.get('/tours/nearby', TourController.getToursByLocation);

router.post('/tour/:tourId/photos', passport.authenticate('jwt', { session: false }), upload.array('photos', 10), TourController.uploadTourPhotos);

module.exports = router;
