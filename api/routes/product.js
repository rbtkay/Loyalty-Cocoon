const Product = require('../objects/product');
const router = require('express').Router();

router.get('/all', Product.getAllProducts);
router.get('/offered', Product.getOfferedProducts);
router.get('/search', Product.getProductSearch);
router.get('/category', Product.getProductByCategory);
router.get('/topDeals', Product.getTopDeals);
router.get('/vendor', Product.getProductsByVendor);
router.get('/add', Product.insertProduct);

module.exports = router;
