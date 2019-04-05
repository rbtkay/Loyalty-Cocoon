const express = require("express");
const router = express.Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const vendorRoutes = require('./vendor');
const Auth = require('../middleware/auth');
const authRoutes = require('./auth');
const contractRoutes = require('./contract');

router.use('/auth', authRoutes);
router.use('/contract', contractRoutes);
router.use('/user', Auth.verifyToken, userRoutes);
router.use('/vendor', Auth.verifyToken, vendorRoutes);

module.exports = router;
