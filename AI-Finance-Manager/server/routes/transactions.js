const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

router.post('/', async (req, res) => {
  const { amount, description, category } = req.body;
  const transaction = new Transaction({ amount, description, category });
  await transaction.save();
  res.json(transaction);
});

module.exports = router;
