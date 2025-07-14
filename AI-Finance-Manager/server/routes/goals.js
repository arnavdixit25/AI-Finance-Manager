// routes/goals.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const Transaction = require('../models/Transaction');

// Create a goal
router.post('/', async (req, res) => {
  try {
    const { targetAmount, durationMonths, description } = req.body;
    const goal = new Goal({ targetAmount, durationMonths, description });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// Compare latest goal with actual savings
router.get('/compare', async (req, res) => {
  try {
    const latestGoal = await Goal.findOne().sort({ createdAt: -1 });
    if (!latestGoal) return res.status(404).json({ message: 'No goal found' });

    const startDate = new Date(latestGoal.createdAt);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + latestGoal.durationMonths);

    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate }
    });

    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    const perMonthTarget = (latestGoal.targetAmount / latestGoal.durationMonths).toFixed(2);
    const status = totalSpent > latestGoal.targetAmount
      ? 'Over budget'
      : 'On track or under budget';

    res.json({
      goal: latestGoal,
      totalSpent,
      perMonthTarget,
      status
    });
  } catch (err) {
    res.status(500).json({ error: 'Comparison failed' });
  }
});

module.exports = router;
