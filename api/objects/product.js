const mysqlConnection = require('../../database/connection');

exports.getAllProducts = (req, res, next) => {
    mysqlConnection.query('select * from product_t', (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.getOfferedProducts = (req, res, next) => {
    const isOffered = 1;

    mysqlConnection.query('select * from product_t where product_offered = ?', [isOffered], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.getProductSearch = (req, res, next) => {
    const searchRequest = req.query.search.toLowerCase();
    const isOffered = 1;
    let filteredResult = [];

    mysqlConnection.query('select * from product_t where product_offered = ?', [isOffered], (err, result, fields) => {
        if (err) throw err;
        result.map((object) => {
            const name = object['product_name'].toLowerCase();
            const vendor = object['vendor_username'].toLowerCase();
            if (name.includes(searchRequest) || vendor.includes(searchRequest)) {
                filteredResult.push(object);
            }
        })

        if (filteredResult.length > 0) {
            res.status(200).send(filteredResult);
        } else {
            res.status(404).send('No Result Found');
        }
    });
}

exports.getProductByCategory = (req, res) => {
    const category = req.query.category;

    mysqlConnection.query('select * from product_t where product_category = ?', [category], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}

exports.getTopDeals = (req, res) => {
    const topDealsMargin = 100;
    const isOffered = 1;

    mysqlConnection.query('select * from product_t where product_loco < ? and product_offered = ?', [topDealsMargin, isOffered], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}

exports.getProductsByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlConnection.query('select * from product_t where vendor_username = ?', [vendor], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
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
                res.status(200).send(result);
            }
        })
    } else {
        res.status(400).send();
    }
}

exports.deleteProductById = (req, res) => {
    var id = req.query.id;
    let temp = id.split(',');

    if (temp) {
        mysqlConnection.query('delete from product_t where product_id in (?)', [temp], (err, result) => {
            if (err) throw err;
            else {
                res.status(200).send(result);
            }
        })
    }
}

exports.addOffersById = (req, res) => {
    var id = req.query.id;
    let temp = id.split(',');

    if (temp) {
        mysqlConnection.query('update product_t set product_offered = 1 where product_id in (?)', [temp], (err, result) => {
            if (err) throw err;
            else {
                res.status(200).send(result);
            }
        })
    }
}

exports.removeOffersById = (req, res) => {
    var id = req.query.id;
    let temp = id.split(',');

    if (temp) {
        mysqlConnection.query('update product_t set product_offered = 0 where product_id in (?)', [temp], (err, result) => {
            if (err) throw err;
            else {
                res.status(200).send(result);
            }
        })
    }
}
