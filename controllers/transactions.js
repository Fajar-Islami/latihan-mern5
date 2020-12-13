const Transactions = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transactions.find();

    return res.status(200).json({
      succsess: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      succsess: false,
      error: 'Server error',
    });
  }
};

// @desc    Get add transactions
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransactions = async (req, res, next) => {
  try {
    console.log(req.body);
    const { text, amount } = req.body;

    const transaction = await Transactions.create(req.body);

    return res.status(201).json({
      succsess: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        succsess: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        succsess: false,
        error: 'Server error',
      });
    }
  }
};

// @desc    Delete transactions
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transactions.findById(req.params.id); // Memastikan data ada

    // Kalo data tidak ada
    if (!transaction) {
      return res.status(404).json({
        succsess: false,
        error: 'No transaction found',
      });
    }

    // Kalo data ada
    await transaction.remove();

    return res.status(200).json({
      succsess: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      succsess: false,
      error: 'Server error',
    });
  }
};
