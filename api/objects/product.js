const mysqlConnection = require('../../database/connection');

exports.getAllProducts = (req, res, next) => {
    mysqlConnection.query('select * from Product_T', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getProductSearch = (req, res, next) => {
    const searchResult = req.query.search;

    mysqlConnection.query('select * from Product_T where vendor_username = ?', [searchResult], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getProductCategory = (req, res) => {
    const category = req.query.category;

    mysqlConnection.query('select * from Product_T where product_category = ?', [category], (err, result, fields) =>{
        if(err) throw err;
        res.send(result);
    })
}

exports.getTopDeals = (req, res) => {
    const topDealsMargin = 100;

    mysqlConnection.query('select * from Product_T where product_loco < ?', [topDealsMargin], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

exports.getProductsByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlConnection.query('select * from product_t where vendor_username = ?', [vendor], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}
