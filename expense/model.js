const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: Date,
  chatId: {type: String, required: true}
})

module.exports = exports = mongoose.model('Expense', ExpenseSchema)