require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./Services/db");
const app = express();
const http = require("http").createServer(app);
const socketService = require("./Services/socket");  // import socket service

const PORT = process.env.PORT || 5000;
const UserRoutes = require("./Routers/userRoutes");
const TourRoutes = require("./Routers/tourRoutes");
const OrderRoutes = require("./Routers/OrderRoutes");
const PaymentRoutes = require("./Routers/paymentRouter");
const BotRoutes = require("./Routers/chatBotRoutes");
const passport = require("passport");
const ChatRoomRoutes = require("./Routers/ChatRoomRoutes");
const passportConfig = require("./Services/passport");
const SearchRoutes = require('./Routers/searchRoutes');
passportConfig(passport);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.use("/users", UserRoutes);
app.use("/tours", TourRoutes);
app.use("/order", OrderRoutes);
app.use("/payment", PaymentRoutes);
app.use("/chatBot", BotRoutes);
app.use("/chatRoom" , ChatRoomRoutes);
app.use("/search" , SearchRoutes);
socketService.initialize(http);  // initialize socket service

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on("error", (err) => {
    console.error(`Error starting server: ${err}`);
});
