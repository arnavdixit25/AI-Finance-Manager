const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  category: String,
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Transaction', TransactionSchema);
