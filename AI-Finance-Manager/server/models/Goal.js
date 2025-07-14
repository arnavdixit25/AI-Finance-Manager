// models/Goal.js
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  targetAmount: {
    type: Number,
    required: true
  },
  durationMonths: {
    type: Number,
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Goal', GoalSchema);
