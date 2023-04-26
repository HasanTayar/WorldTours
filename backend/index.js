require('dotenv').config();
const cors = require('cors');
const express = require('express');
const db = require('./db');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  },
});
const PORT = process.env.PORT || 5000;
const UserRoutes = require('./Routers/userRoutes');
const TourRoutes = require('./Routers/tourRoutes');
const ChatRoutes = require('./Routers/ChatRoutes');
const passport = require('passport');
const passportConfig = require('./passport');

passportConfig(passport);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.use(UserRoutes);
app.use(TourRoutes);
app.use(ChatRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    socket.broadcast.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err}`);
});
