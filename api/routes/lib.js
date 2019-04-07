const Lib = require('../objects/lib');
const router = require('express').Router();

router.get('/confirmEmail', Lib.sendConfirmEmail);
router.get('/verify', Lib.verifyEmail);
router.get('/usernamesEmails', Lib.getUsernamesEmails);
router.get('/code', Lib.sendCode);

module.exports = router;