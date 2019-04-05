const Lib = require('../objects/lib');
const router = require('express').Router();

router.get('/confirmEmail', Lib.sendConfirmEmail);
router.get('/verify', Lib.verifyEmail);

module.exports = router;