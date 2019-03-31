const mysqlconnection = require('../../database/connection');

exports.getPurchasesByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlconnection.query('select purchase_t.*, product_t.product_name from purchase_t, product_t where purchase_t.vendor_username = ? and purchase_t.purchase_finalized = 0 and purchase_t.product_id = product_t.product_id', [vendor], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    });
}

exports.getPurchasesByUser = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select purchase_t.*, product_t.product_name from purchase_t, product_t where purchase_t.user_username = ? and purchase_t.product_id = product_t.product_id', [username], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    })
}

exports.finalizePurchase = (req, res) => {
    const id = req.query.id;

    mysqlconnection.query('update purchase_t set purchase_finalized = 1 where purchase_id = ?', [id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Purchase Finalized');
    });
}

exports.getPurchaseByVendorUser = (req, res) => {
    const vendorUsername = req.query.vendorUsername;
    const userUsername = req.query.userUsername;

    mysqlconnection.query('select purchase_t.*, product_t.product_name from purchase_t, product_t where (purchase_t.vendor_username = ? and purchase_t.user_username = ?) and purchase_t.product_id = product_t.product_id', [vendorUsername, userUsername], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    });
}

exports.addPurchase = (req, res) => {
    const { username, productId, vendorUsername, purchaseTime } = req.query;

    mysqlconnection.query('insert into purchase_t (user_username, product_id, vendor_username, purchase_time) values (?,?,?,?)', [username, productId, vendorUsername, purchaseTime], (err, result) => {
        if (err) throw err;
        // if (result.length > 0) {
        res.status(200).send(result);
        // }
    });
}


