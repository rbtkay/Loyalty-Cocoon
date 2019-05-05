const Product = require('../objects/product');
const router = require('express').Router();

router.get('/all', Product.getAllProducts);
router.get('/offered', Product.getOfferedProducts);
router.get('/search', Product.getProductSearch);
router.get('/category', Product.getProductByCategory);
router.get('/topDeals', Product.getTopDeals);
router.get('/vendor', Product.getProductsByVendor);
router.get('/add', Product.insertProduct);
router.get('/delete', Product.deleteProductById);
router.get('/addOffer', Product.addOffersById);
router.get('/removeOffer', Product.removeOffersById);
router.get('/recommended', Product.recommended);

module.exports = router;
