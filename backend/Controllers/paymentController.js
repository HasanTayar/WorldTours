const PaymentMethod = require('../Models/PaymentModel');

exports.hasPaymentRef = async (req, res) => {
  try {
    const { userId } = req.params;
    const paymentMethod = await PaymentMethod.findOne({ userId });
    res.status(200).json({ hasPaymentRef: !!paymentMethod });
  } catch (error) {
    res.status(500).json({ message: 'Error checking payment reference', error });
  }
};

exports.addPaymentMethod = async (req, res) => {
  try {
    const { userId, cardNumber, expiryDate, cvv } = req.body;
    const paymentMethod = new PaymentMethod({ userId, cardNumber, expiryDate, cvv });
    await paymentMethod.save();
    res.status(201).json({ message: 'Payment method added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment method', error });
  }
};
