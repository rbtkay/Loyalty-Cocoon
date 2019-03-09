const Product = require('../objects/product');
const router = require('express').Router();

router.get('/all', Product.getAllProducts); 

module.exports = router;
