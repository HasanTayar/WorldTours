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
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;
const UserRoutes = require('./Routers/userRoutes');
const TourRoutes = require('./Routers/tourRoutes');
const ChatRoutes = require('./Routers/chatRoutes');
const OrderRoutes = require('./Routers/OrderRoutes');
const PaymentRoutes = require('./Routers/paymentRouter');
const passport = require('passport');
const passportConfig = require('./passport');

const chatSocket = require('./Routers/chatSocket')
const BotRoutes = require('./Routers/chatBotRoutes');
passportConfig(passport);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.use('/users',UserRoutes);
app.use('/tours',TourRoutes);
app.use('/chat', ChatRoutes)
app.use('/order',OrderRoutes);
app.use('/payment',PaymentRoutes);
app.use('/chatBot' , BotRoutes);
app.use('/chat' , ChatRoutes);
chatSocket(io);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err}`);
});
