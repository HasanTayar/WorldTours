require('dotenv').config();
const cors = require('cors');
const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
const UserController = require('./services/userService/UserController');
const multer = require('multer');
const passport = require('passport');
const passportConfig = require('./passport');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/userPhoto');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

passportConfig(passport);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.post('/signup', upload.single('photo'), UserController.signup);
app.post('/verify-email', UserController.verifyEmail);
app.post('/login', UserController.login);
app.put('/update-profile', passport.authenticate('jwt', { session: false }), UserController.updateUserProfile);
app.get('/user/:userEmail', UserController.getUserProfile);
app.put('/set-admin', UserController.setAdmin);
app.post('/forgot-password', UserController.forgotPassword);
app.post('/reset-password', UserController.resetPassword);
app.delete('/delete-profile', UserController.deleteUserProfile);
app.get('/getLoginInUser', UserController.getUserByToken);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err}`);
});
