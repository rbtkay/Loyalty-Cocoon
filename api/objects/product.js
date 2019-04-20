const mysqlConnection = require('../../database/connection');

exports.getAllProducts = (req, res, next) => {
    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.user_id = user_t.user_id', (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.getOfferedProducts = (req, res, next) => {
    const isOffered = 1;

    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.product_isOffered = ? and product_t.user_id = user_t.user_id', [isOffered], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.getProductSearch = (req, res, next) => {
    const searchRequest = req.query.search.toLowerCase();
    const isOffered = 1;
    let filteredResult = [];

    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.product_isOffered = ? and product_t.user_id = user_t.user_id', [isOffered], (err, result, fields) => {
        if (err) throw err;
        result.map((object) => {
            const name = object['product_name'].toLowerCase();
            const vendor = object['user_username'].toLowerCase();
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

    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.product_category = ? and product_t.product_isOffered = 1 and product_t.user_id = user_t.user_id', [category], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}

exports.getTopDeals = (req, res) => {
    const topDealsMargin = 100;
    const isOffered = 1;

    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.product_loco < ? and product_t.product_isOffered = ? and product_t.user_id = user_t.user_id', [topDealsMargin, isOffered], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}

exports.getProductsByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where user_t.user_username = ? and product_t.user_id = user_t.user_id', [vendor], (err, result) => {
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
        mysqlConnection.query('select user_id from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            const id = result[0].user_id;
            mysqlConnection.query('insert into product_t (product_name, product_category, product_price, product_loco, product_description, user_id) values (?, ?, ?, ?, ?, ?)', [
                name,
                category,
                price,
                loco,
                description,
                id
            ], (err, result) => {
                if (err) throw err;
                else {
                    res.status(200).send(result);
                }
            })
        })
    } else {
        res.status(400).send();
    }
}

exports.deleteProductById = (req, res) => {
    var id = req.query.id;
    let temp = id.split(',');
    if (temp) {
        mysqlConnection.query('UPDATE product_t SET product_t.product_isDeleted = 1, product_t.product_isOffered = 0 where product_t.product_id in (?)', [temp], (err, result) => {
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
        mysqlConnection.query('update product_t set product_isOffered = 1 where product_id in (?)', [temp], (err, result) => {
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
        mysqlConnection.query('update product_t set product_isOffered = 0 where product_id in (?)', [temp], (err, result) => {
            if (err) throw err;
            else {
                res.status(200).send(result);
            }
        })
    }
}
