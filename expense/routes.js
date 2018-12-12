var express = require('express');
var router = express.Router();

const Expense = require('./model')

/* GET home page. */
router.get('/', function(req, res, next) {
  Expense.find(function (err, expenses) {
    if (err) return next(err);
    res.json(expenses);
  });
});

module.exports = router;