const express = require('express');
const router = express.Router();

const auth = require('../objects/auth');

router.get('/userLogin', auth.userAuth);
router.get('/userSignUp', auth.userSignUp);
router.get('/vendorLogin', auth.vendorAuth);
router.get('/vendorSignUp', auth.vendorSignUp);

module.exports = router;

