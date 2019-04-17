const mysqlconnection = require('../../database/connection');

//FIXME: Refactor
exports.getPurchasesByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlconnection.query('select purchase_t.*, product_t.product_name from purchase_t, product_t where purchase_t.vendor_id = ? and purchase_t.product_id = product_t.product_id', [vendor], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    });
}

//FIXME: Refactor
exports.getPurchasesByUser = (req, res) => {
    const username = req.query.username;

    mysqlconnection.query('select purchase_t.*, product_t.product_name from purchase_t, product_t where purchase_t.cust_id = ? and purchase_t.product_id = product_t.product_id', [username], (err, result) => {
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

//FIXME: Refactor
exports.getPurchaseByVendorUser = (req, res) => {
    const vendorUsername = req.query.vendorUsername;
    const customerUsername = req.query.userUsername;

    mysqlconnection.query('select purchase_t.*, product_t.product_name from purchase_t, product_t where (purchase_t.vendor_id = ? and purchase_t.cust_id = ?) and purchase_t.product_id = product_t.product_id', [vendorUsername, customerUsername], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    });
}

//FIXME: Refactor
exports.addPurchase = (req, res) => {
    const { username, productId, vendorUsername, purchaseTime } = req.query;

    mysqlconnection.query('insert into purchase_t (cust_id, product_id, vendor_id, purchase_date) values (?,?,?,?)', [username, productId, vendorUsername, purchaseTime], (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}
