const Lib = require('../objects/lib');
const router = require('express').Router();

router.get('/confirmEmail', Lib.sendConfirmEmail);
router.get('/verify', Lib.verifyEmail);
router.get('/usernamesEmails', Lib.getUsernamesEmails);
router.get('/code', Lib.sendCode);
router.get('/changePassword', Lib.changePassword);
router.get('/receipt', Lib.sendReceiptEmail);
router.get('/referral', Lib.sendReferral);

module.exports = router;
