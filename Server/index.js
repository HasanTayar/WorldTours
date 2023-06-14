require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./Services/db");
const app = express();
const http = require("http").createServer(app);
const socketService = require("./Services/socket");  // import socket service
const { scheduleReviewEmails } = require('./Controllers/Review');
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
const adminRoutes = require('./Routers/adminRoutes');
const reviewRoutes = require('./Routers/Review');
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
app.use('/admin', adminRoutes);
app.use('/reviews' , reviewRoutes);
socketService.initialize(http); 
//For Hosting on Futere
// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin" ,"URL" );
//     res.header("Access-Control-Allow-Headers","Origin , X-Requested-With , Content-Type , Accept");
//     next();
// })
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    scheduleReviewEmails();
}).on("error", (err) => {
    console.error(`Error starting server: ${err}`);
});
