const PaymentMethod = require("../Models/PaymentModel");

exports.hasPaymentRef = async (req, res) => {
  try {
    const { userId } = req.params;
    const paymentMethods = await PaymentMethod.find({ userId });
    console.log("PaymentMethods:", paymentMethods); 
    res.status(200).json(paymentMethods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking payment reference", error });
  }
};



exports.addPaymentMethod = async (req, res) => {
  try {
    const { userId, cardNumber, expiryDate, cvv } = req.body;
    const paymentMethod = new PaymentMethod({
      userId,
      cardNumber,
      expiryDate,
      cvv,
    });
    await paymentMethod.save();
    res
      .status(201)
      .json({ message: "Payment method added successfully", paymentMethod });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding payment method", error });
  }
};

exports.deltePaymentMethod = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await PaymentMethod.findByIdAndDelete(cardId);
    if (!card) {
      res.status(404).send({ message: "Criedt Card  not found" });
    } else {
      res.status(200).send({ message: "Criedt Card successfully deleted! " });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        message: "An error occurred while fetching the user. Please try again.",
      });
  }
};
