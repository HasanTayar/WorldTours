const User = require('../Models/UserModel');
const Tour = require('../Models/TourModel');
const ChatRoom = require('../Models/ChatRoom');
const Order = require('../Models/OrderModel');

// Function to get all users
exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

// Function to get all tours
exports.getAllTours = async () => {
  try {
    const tours = await Tour.find();
    return tours;
  } catch (error) {
    console.error('Error retrieving tours:', error);
    throw error;
  }
};

// Function to get all chat rooms
exports.getAllChatRooms = async () => {
  try {
    const chatRooms = await ChatRoom.find();
    return chatRooms;
  } catch (error) {
    console.error('Error retrieving chat rooms:', error);
    throw error;
  }
};

// Function to get all orders
exports.getAllOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error('Error retrieving orders:', error);
    throw error;
  }
};
