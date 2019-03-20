const mysqlConnection = require('../../database/connection');

exports.getAllProducts = (req, res, next) => {
    mysqlConnection.query('select * from Product_T', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}


exports.getOfferedProducts = (req, res, next) => {
    const isOffered = 1;

    mysqlConnection.query('select * from Product_T where product_offered = ?',[isOffered], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getProductSearch = (req, res, next) => {
    const searchRequest = req.query.search.toLowerCase();
    const isOffered = 1;
    let filteredResult = [];

    mysqlConnection.query('select * from Product_T where product_offered = ?', [isOffered], (err, result, fields) => {
        if (err) throw err;
        result.map((object) => {
            const name = object['product_name'].toLowerCase();
            if (name.includes(searchRequest)) {
                filteredResult.push(object);
            }
        })

        if (filteredResult.length > 0) {
            res.send(filteredResult);
        } else {
            res.send('404');
        }
    });
}

exports.getProductByCategory = (req, res) => {
    const category = req.query.category;

    mysqlConnection.query('select * from Product_T where product_category = ?', [category], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    })
}

exports.getTopDeals = (req, res) => {
    const topDealsMargin = 100;
    const isOffered = 1;

    mysqlConnection.query('select * from Product_T where product_loco < ? and product_offered = ?', [topDealsMargin, isOffered], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}
