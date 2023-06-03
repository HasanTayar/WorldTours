const express = require('express');
const router = express.Router();
const TourController = require('../Controllers/ToursController');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const toursPhotosPath = path.join('../Client/public/toursPhotos');
    cb(null, toursPhotosPath);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const fileName = `${file.originalname}-${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

// Create Tour
router.post('/create-tour', upload.any(), TourController.createTour);
// Get all Tours
router.get('/tours', TourController.getAllTours);
// Get Tour by ID
router.get('/:tourId', TourController.getTourById);
// Update Tour by ID
router.put('/update/:tourId', passport.authenticate('jwt', { session: false }), TourController.updateTourById);
// Delete Tour by ID
router.delete('/delete/:tourId', passport.authenticate('jwt', { session: false }), TourController.deleteTourById);
// Get Tour by Location
router.get('/nearby', TourController.getToursByLocation);

// Upload Tour Photos
router.post('/:tourId/photos', passport.authenticate('jwt', { session: false }), upload.array('photos', 10), TourController.uploadTourPhotos);

module.exports = router;
