require('./utils/db')
const moment = require('moment')
const TelegramBot = require('telegraf');
const config = require('./config')

const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN);
const Expense = require('./expense/model')

bot.start((ctx) => ctx.reply('Hi! My name is TrackMeMoney'))
// bot.on('message', (msg) => {
//   bot.sendMessage(msg.chat.id, `Hi ${msg.chat.id}! My name is TrackMeMoney`);
// });

bot.hears('hi', (ctx) => ctx.reply('Hey there!'))

bot.command('listExpenses', (ctx) => {
  console.log(ctx.from)
  Expense.find(function (err, expenses) {
    if (err) {
      ctx.reply('I am having some difficulties with finding your expenses.');
    } else {
      let messages = 'Here are your expenses: \n'
      expenses.forEach((expense, index) => {
        messages += `${index+1}. ${moment(expense.date).format('YY/MM/DD')}: ${expense.category} - $${expense.amount} \n`
      })

      ctx.reply(messages);
    }
  });
})

bot.command('add', (ctx) => {
  console.log(ctx.from)
  ctx.reply('adding...')
  let expense = new Expense({
    chatId: ctx.from.id,
    date: new Date(),
    amount: 50,
    category: 'travel'
  })

  expense.save((err) => {
    if(err) {
      ctx.reply("I couldn't save your expense")
    } else {
      ctx.reply("Your new expense has been saved!")
    }
  })
})

bot.startPolling()
// bot.onText(/\/listExpenses/, (msg) => {
//   //bot.sendMessage(msg.chat.id, `jdfkafdfjkdsalfksladf;`);
//   Expense.find(function (err, expenses) {
//     if (err) {
//       bot.sendMessage(msg.chat.id, 'I am having some difficulties with finding your expenses.');
//     } else {
//       let messages = 'Here are your expenses: \n'
//       expenses.forEach((expense, index) => {
//         messages += `${index+1}. ${moment(expense.date).format('YY/MM/DD')}: ${expense.category} - $${expense.amount} \n`
//       })

//       bot.sendMessage(msg.chat.id, messages);
//     }
//   });
// })
