const User = require('../objects/user');
const router = require('express').Router();

const productRoutes = require('./product');
const purchaseRoutes = require('./purchase');

router.use('/product', productRoutes);
router.use('/purchase', purchaseRoutes);

router.get('/all', User.getAllUser)
router.get('/byEmail', User.getUserByEmail);
router.get('/address', User.getVendorAddress);
router.get('/byUsername', User.getUserByUsername);

module.exports = router;
