const express = require('express');
const UserController = require('../Controllers/UserController');
const multer = require('multer');
const passport = require('passport');
const { isAdmin } = require('../Controllers/UserController');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Client/public/userPhoto');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const storageCv = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Client/public/Cv');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadCv = multer({ storage: storageCv });
const router = express.Router();

router.get('/admins', UserController.getAdmins);
router.delete('/delete-profile', UserController.deleteUserProfile);
router.get('/id/:userId', UserController.getUserById);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/login', UserController.login);
router.post('/reset-password', UserController.resetPassword);
router.post('/signup', upload.single('photo'), UserController.signup);
router.put('/update-profile', upload.single('photo'), passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);
router.post('/verify-email', UserController.verifyEmail);
router.get('/userByToken', UserController.getUserByToken);
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getAllUsers);
router.get('/:userEmail', UserController.getUserProfile);
router.post('/set-organizer/:userId', UserController.setOrganizer);
router.put('/upload-cv/:userId',uploadCv.single('cv'), UserController.uploadCV);
router.post('/forget-password' , UserController.forgotPassword);
router.put('/:userId/update-password', async (req, res) => {
  const {  currentPassword, newPassword } = req.body;
  const{userId}= req.params;
  console.log(req.body);
  console.log(req.params);
  if (!userId || !currentPassword || !newPassword) {
    console.log("missing");
    return res.status(400).json({ message: 'Missing required fields' });
   
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("user ntf")
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare currentPassword with the user's hashed password in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      console.log("isMAtch?")
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    console.log("succes")
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.post('/unpromote-admin/:userId' ,UserController.unPromoteAdmin);
router.post('/unpromote-organizer/:userId', UserController.unPromoteOrganizer);


module.exports = router;