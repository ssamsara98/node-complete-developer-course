const express = require('express');

const usersRouter = require('./routes/users-router');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  return res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);

module.exports = router;
