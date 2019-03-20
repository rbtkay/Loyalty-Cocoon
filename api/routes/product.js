const Product = require('../objects/product');
const router = require('express').Router();

router.get('/all', Product.getAllProducts);
router.get('/search', Product.getProductSearch);
router.get('/category', Product.getProductCategory);
router.get('/topDeals', Product.getTopDeals);
router.get('/vendor', Product.getProductsByVendor);

module.exports = router;
