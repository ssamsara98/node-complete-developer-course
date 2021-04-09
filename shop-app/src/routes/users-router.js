const express = require('express');

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', async (req, res, next) => {
  return res.send('respond with a resource');
});

module.exports = usersRouter;
