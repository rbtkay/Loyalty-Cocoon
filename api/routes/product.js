const Product = require('../objects/product');
const router = require('express').Router();

router.get('/all', Product.getAllProducts);
router.get('/search', Product.getProductSearch);
router.get('/category', Product.getProductByCategory);
router.get('/topDeals', Product.getTopDeals);

module.exports = router;
