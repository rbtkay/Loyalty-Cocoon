const express = require("express");
const router = express.Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const vendorRoutes = require('./vendor');
const Auth = require('../middleware/auth');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);
router.use('/user', Auth.verifyToken, userRoutes);
// router.use('/product', Auth.verifyToken, productRoutes);
router.use('/vendor', Auth.verifyToken, vendorRoutes);

module.exports = router;
