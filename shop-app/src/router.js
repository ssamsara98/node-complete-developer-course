const express = require('express');

const adminRouter = require('./routes/admin-router');
const authRouter = require('./routes/auth-router');
const shopRouter = require('./routes/shop-router');

const router = express.Router();

router.use('/admin', adminRouter);
router.use(shopRouter);
router.use(authRouter);

module.exports = router;
