const mysqlConnection = require('../../database/connection');

exports.getAllProducts = (req, res, next) => {
    mysqlConnection.query('select * from Product_T', (err, result, fields) => {
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
        
        console.log(filteredResult);
        console.log(filteredResult.length);
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

    mysqlConnection.query('select * from Product_T where product_loco < ?', [topDealsMargin], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}
