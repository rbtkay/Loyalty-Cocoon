const express = require('express');
const router = express.Router();

const auth = require('../objects/auth');

router.get('/login', auth.login);
router.get('/userSignUp', auth.userSignUp);
router.get('/vendorSignUp', auth.vendorSignUp);

module.exports = router;
