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

router.post('/create-tour', upload.any(), TourController.createTour);

router.get('/tours', TourController.getAllTours);
router.get('/:tourId', TourController.getTourById);
router.put('/:tourId', passport.authenticate('jwt', { session: false }), TourController.updateTourById);
router.delete('/:tourId', passport.authenticate('jwt', { session: false }), TourController.deleteTourById);
router.get('/nearby', TourController.getToursByLocation);
router.get('/search', TourController.searchTours);

router.post('/:tourId/photos', passport.authenticate('jwt', { session: false }), upload.array('photos', 10), TourController.uploadTourPhotos);

module.exports = router;
