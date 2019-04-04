const Lib = require('../objects/lib');
const router = require('express').Router();

router.get('/confirmEmail', Lib.sendConfirmEmail);

module.exports = router;