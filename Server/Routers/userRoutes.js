const express = require('express');
const UserController = require('../Controllers/UserController');
const multer = require('multer');
const passport = require('passport');
const { isAdmin } = require('../Controllers/UserController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Client/public/userPhoto');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage });

const router = express.Router();

router.get('/userByToken', UserController.getUserByToken);
router.post('/signup', upload.single('photo'), UserController.signup);
router.post('/verify-email', UserController.verifyEmail);
router.post('/login', UserController.login);
router.put('/update-profile', passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);

router.post('/set-admin', passport.authenticate('jwt', { session: false }), isAdmin, UserController.setAdmin);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.delete('/delete-profile', UserController.deleteUserProfile);

router.get('/admins', UserController.getAdmins);
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getAllUsers);
router.get('/id/:userId', UserController.getUserById);

router.get('/:userEmail', UserController.getUserProfile);
module.exports = router;