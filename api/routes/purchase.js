const router = require('express').Router();
const Purchase = require('../objects/puchases');

router.get('/add', Purchase.addPurchase);
router.get('/byVendor', Purchase.getPurchasesByVendor);
router.get('/byUser', Purchase.getPurchasesByUser);
router.get('/finalize', Purchase.finalizePurchase);
router.get('/byVendorUser', Purchase.getPurchaseByVendorUser);


module.exports = router;
