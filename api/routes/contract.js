const Contract = require('../objects/contract');
const router = require('express').Router();

router.get('/grant', Contract.grantPoints);
router.get('/transfer', Contract.transferFrom);

module.exports = router;
