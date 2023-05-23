const Order = require('../Models/OrderModel');
const Tour = require('../Models/TourModel');

exports.createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    // Update the order count for the tour
    const tour = await Tour.findById(req.body.tourId);
    if (tour) {
      tour.orderCount += 1;
      await tour.save();
    }

    res.status(201).json({
      status: 'success',
      data: {
        order: savedOrder
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({
        status: 'fail',
        message: 'Order not found'
      });
      return;
    }

    // Update the order count for the tour
    const tour = await Tour.findById(order.tourId);
    if (tour) {
      tour.orderCount -= 1;
      await tour.save();
    }

    // Remove the order
    await order.remove();

    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Fetch all orders
exports.fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('tourId').populate('userId');
    res.status(200).json({
      orders
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Approve an order
exports.approveOrder = async (req, res) => {
  try {

    const orderId = req.params.orderId;
    console.log(orderId);
    const order = await Order.findById(orderId);
    console.log(order);

    if (!order) {
      res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
      return;
    }

    order.aprroved = true;
    await order.save();

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Cancel an order (organizer)
exports.cancelOrderOrganizer = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
      return;
    }

    // Update the order count for the tour
    const tour = await Tour.findById(order.tourId);
    if (tour) {
      tour.orderCount -= 1;
      await tour.save();
    }

    // Set order as not approved
    order.aprroved = false;
    await order.save();

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({
        status: 'fail',
        message: 'Order not found',
      });
      return;
    }

    // Update the order count for the tour
    const tour = await Tour.findById(order.tourId);
    if (tour) {
      tour.orderCount -= 1;
      await tour.save();
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
