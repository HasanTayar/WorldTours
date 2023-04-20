require('dotenv').config();
const cors = require('cors');
const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;
const UserRoutes = require('./services/userRoutes'); // <-- Add this line
const TourRoutes = require('./services/tourRoutes');
const passport = require('passport');
const passportConfig = require('./passport');

passportConfig(passport);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.use(UserRoutes);
app.use(TourRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err}`);
});
