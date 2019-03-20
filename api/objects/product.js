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

exports.insertProduct = (req, res) => {
    var name = req.query.name;
    var category = req.query.category;
    var price = req.query.price;
    var loco = req.query.loco;
    var description = req.query.description;
    var username = req.query.username;

    if (name && category && price && loco && description && username) {
        mysqlConnection.query('insert into product_t (product_name, product_category, product_price, product_loco, product_description, vendor_username) values (?, ?, ?, ?, ?, ?)', [
            name,
            category,
            price,
            loco,
            description,
            username
        ], (err, result) => {
            if (err) throw err;
            else {
                res.send('Successfully added');
            }
        })
    }
}
