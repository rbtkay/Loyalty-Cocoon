const express = require("express");
const router = express.Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const vendorRoutes = require('./vendor');
const Auth = require('../middleware/auth');

router.use('/user', userRoutes);
router.use('/product', Auth.verifyToken, productRoutes);
router.use('/vendor', vendorRoutes);

module.exports = router;
