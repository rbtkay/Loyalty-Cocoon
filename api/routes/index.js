const express = require("express");
const router = express.Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const Auth = require('../../lib/auth');

router.use('/user', userRoutes);
router.use('/product', Auth.verifyToken, productRoutes);

module.exports = router;