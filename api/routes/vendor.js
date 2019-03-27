const Vendor = require('../objects/vendor');
const router = require('express').Router();

const productRoutes = require('./product');
const purchaseRoutes = require('./purchase');

router.use('/product', productRoutes);
router.use('/purchase', purchaseRoutes);

router.get('/all', Vendor.getAllVendors);
router.get('/auth', Vendor.authVendor);
router.get('/signUp', Vendor.signUp);

module.exports = router;
