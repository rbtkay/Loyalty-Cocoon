const router = require('express').Router();
const Purchase = require('../objects/puchases');

router.get('/byVendor', Purchase.getPurchasesByVendor);
router.get('/finalize', Purchase.finalizePurchase);


module.exports = router;
