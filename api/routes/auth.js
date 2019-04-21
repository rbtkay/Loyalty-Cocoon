const express = require('express');
const router = express.Router();

const auth = require('../objects/auth');

router.get('/login', auth.login);
router.get('/userSignUp', auth.userSignUp);
router.get('/vendorSignUp', auth.vendorSignUp);
router.get('/confirmEmail', auth.sendConfirmEmail);
router.get('/resetPassword', auth.sendCode);
router.get('/referral', auth.sendReferral);

module.exports = router;
