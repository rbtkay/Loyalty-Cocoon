const mysqlConnection = require('../../database/connection');
const spawn = require('child_process').spawn;
const { PythonShell } = require('python-shell');
require('dotenv').config();

exports.getAllProducts = (req, res, next) => {
    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.user_id = user_t.user_id', (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.getInfo = (req, res, next) => {
    const { id } = req.query;
    const temp = id.split(',')

    mysqlConnection.query('select product_t.*, user_t.user_username from product_t, user_t where product_t.user_id = user_t.user_id and product_t.product_id in (?)', [temp], (err, result) => {
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

exports.recommended = async (req, res) => {
    const username = req.query.username;

    mysqlConnection.query('select purchase_t.*, product_name from purchase_t, product_t where purchase_t.cust_id = (select user_id from user_t where user_t.user_username = ?) and purchase_t.product_id = product_t.product_id'
        , [username],
        (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                let productIds = [];
                let pythonIds = [];
                result.map(item => {
                    const id = {
                        id: item['product_id'],
                        name: item['product_name']
                    };
                    if (!productIds.includes(id)) {
                        productIds.push(id);
                        pythonIds.push(id.id);
                    }
                })

                // let recommendedProducts = [];
                // productIds.map(id => {
                //     // var object =
                //     let recommendation = {
                //         name: id.name,
                //         recommended: getRecommendation(id.id)
                //     };
                //     recommendedProducts.push(recommendation)
                // })
                const id = 126;
                // const test = getRecommendation(id);
                // res.status(200).send(test)
                let index = 0;

                getRecommendation(index, res, pythonIds, productIds)

                // var spawn = require("child_process").spawn;
                // var child = spawn('python', [`./api/recomendation.py`, productIds[index]]);
                // child.stdout.on('data', (data) => {

                //     index++;
                //     if (index >= productIds.length - 1) {
                //         res.status(200).send(data);
                //     }else{

                //     }
                //     console.log(id);
                //     console.log(data.toString());

                //     // res.status(200).send(object);
                //     // return data.toString();
                // });

                // child.stderr.on('data', (data) => {
                //     console.log(data.toString());
                // })
                // child.on('exit', (code) => {
                //     console.log("exit with code: " + code);
                // })


            } else {
                res.status(404).send('no product found');
            }
        })
}

async function getRecommendation(index, res, pythonIds, productIds) {
    var spawn = require("child_process").spawn;
    var dir = process.env.PATH;
    var child = spawn("python", ["api/recomendation.py", pythonIds]);
    child.stdout.on('data', (data) => {
        const pythonResult = JSON.parse(data.toString());
        let recommendedProduct = {};

        pythonResult.forEach(item => {
            let product = {};
            const name = productIds.find((obj) => {
                if (obj.id == item.id) {
                    return obj.name;
                }
            })
            product[name.name] = item.recommended;

            recommendedProduct = Object.assign(product, recommendedProduct);

            //     recommendedProduct = Object.assign(product, recommendedProduct)
            //     recommendedProduct = Object.assign(item.recommended, recommendedProduct);
            //     return recommendedProduct;
        })
        res.status(200).send(recommendedProduct);
    });

    child.stderr.on('data', (data) => {
        console.log(data.toString());
    })
    child.on('exit', (code) => {
        console.log("exit with code: " + code);

    })
}
