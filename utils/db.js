/* MongoDB Connect */
const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise;

mongoose.connect(config.MONGODB_URL)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));