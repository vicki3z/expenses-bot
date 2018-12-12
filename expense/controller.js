const Expense = require('./model')

exports.listAll = (req,res) => {
  console.log('list all expenses')
  Expense.find()
    .then(expenses => {
      res.json(expenses)
    })
    .catch(err => {
      console.log(err)
    })
}
