const router = require('express').Router();
const stats = require('../objects/stats');

router.get('/countProductOfferedVender', stats.countProductVendor);
router.get('/countPurchaseVendorPerMonth', stats.countPurchasePerMonth);

module.exports = router;