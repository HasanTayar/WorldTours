const express = require('express');
const UserController = require('./UserController');
const multer = require('multer');
const passport = require('passport');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/userPhoto');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/signup', upload.single('photo'), UserController.signup);
router.post('/verify-email', UserController.verifyEmail);
router.post('/login', UserController.login);
router.put('/update-profile', passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);
router.get('/user/:userEmail', UserController.getUserProfile);
router.put('/set-admin', UserController.setAdmin);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.delete('/delete-profile', UserController.deleteUserProfile);
router.get('/getLoginInUser', UserController.getUserByToken);

module.exports = router;
