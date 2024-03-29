const Order = require('../Models/OrderModel');
const Tour = require('../Models/TourModel');

exports.createOrder = async (req, res) => {
  console.log("create order start");
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
  console.log("Cancel order start");
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
    if (tour && tour.orderCount > 0) {
     tour.orderCount -= 1;
      await tour.save();
    }
    order.isCanceld = true;
    // Remove the order
    await order.save();

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
  console.log("fetching order start");
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
  console.log("approve order start");

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
  console.log("canel orgainzer  order start");

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
    if (tour && tour.orderCount >0) {
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
  console.log("delete order start");
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
// Fetch all booked dates for a specific tour
exports.fetchBookedDatesForTour = async (req, res) => {
  console.log("Fetching booked dates start");
  try {
    const tourId = req.params.tourId;
    const orders = await Order.find({ tourId: tourId, isCanceld: false , isDone:false});
    const bookedDates = orders.map(order => order.selectedDate);
    res.status(200).json({
      bookedDates
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
