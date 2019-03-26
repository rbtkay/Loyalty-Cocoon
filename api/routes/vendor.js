const Vendor = require('../objects/vendor');
const router = require('express').Router();

const productRoutes = require('./product');

router.use('/product', productRoutes);
router.get('/all', Vendor.getAllVendors);
router.get('/auth', Vendor.authVendor);
router.get('/signUp', Vendor.signUp);

module.exports = router;
