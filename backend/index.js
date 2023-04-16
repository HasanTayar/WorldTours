const cors = require('cors');
const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
const UserController = require('./services/userService/UserController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/userPhoto'); // save uploaded files in the uploads/ directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original filename
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json()); // parse JSON data in the request body
app.post('/signup', upload.single('photo'), UserController.signup);
app.post('/verify-email', UserController.verifyEmail);
app.post('/login', UserController.login);
app.put('/update-profile', UserController.updateUserProfile);
app.get('/user/:userEmail', UserController.getUserProfile);
app.put('/set-admin', UserController.setAdmin);
app.post('/forgot-password', UserController.forgotPassword);
app.post('/reset-password' , UserController.resetPassword);
app.delete('/delete-profile', UserController.deleteUserProfile); // Added route for deleting user profile
app.get('/getLoginInUser' , UserController.getUserByToken);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err}`);
});
