const User = require('../objects/user');
const router = require('express').Router();

const productRoutes = require('./product');

router.use('/product', productRoutes);
router.get('/all', User.getAllUser)
router.get('/byEmail', User.getUserByEmail);
router.get('/auth', User.authUser);
router.get('/signUp', User.signUp);

module.exports = router;