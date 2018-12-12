var express = require('express');
var router = express.Router();
const client = require('../client')

router.post('/', (req, res, next) => {
  client
    .sendMessage(req.body.message.chat.id, 'Hi hi')
    .promise()
    .then(() => res.json({ ok: true }))
    // something above failed, we will use express' default error handling
    .catch(next);
});

module.exports = router