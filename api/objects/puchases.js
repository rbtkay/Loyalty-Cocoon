const mysqlconnection = require('../../database/connection');

exports.getPurchasesByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlconnection.query('select purchase_t.*, product_t.product_name, user_t.user_username from purchase_t, product_t, user_t where purchase_t.vendor_id = (select user_id from user_t where user_username = ?) and purchase_t.product_id = product_t.product_id and purchase_t.vendor_id = user_t.user_id', [vendor], (err, result) => {
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

    mysqlconnection.query('select purchase_t.*, product_t.product_name, user_t.user_username from purchase_t, product_t, user_t where purchase_t.cust_id = (select user_id from user_t where user_username = ?) and purchase_t.product_id = product_t.product_id and purchase_t.vendor_id = user_t.user_id',
        [username], (err, result) => {
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
    const customerUsername = req.query.userUsername;

    mysqlconnection.query('select purchase_t.*, product_t.product_name, user_t.user_username from purchase_t, product_t, user_t where (purchase_t.vendor_id = (select user_id from user_t where user_username = ?) and purchase_t.cust_id = (select user_id from user_t where user_username = ?)) and purchase_t.product_id = product_t.product_id and purchase_t.vendor_id = user_t.user_id', [vendorUsername, customerUsername], (err, result) => {
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

    mysqlconnection.query('insert into purchase_t (cust_id, product_id, vendor_id, purchase_date) values ((select user_id from user_t where user_t.user_username = ?),2,(select user_id from user_t where user_t.user_username = ?),?)', [username, productId, vendorUsername, purchaseTime], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}
