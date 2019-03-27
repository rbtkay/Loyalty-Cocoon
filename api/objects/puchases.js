const mysqlconnection = require('../../database/connection');

exports.getPurchasesByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlconnection.query('select purchase_t.*, product_t.product_name, user_t.user_username from purchase_t, product_t, user_t where purchase_t.vendor_username = ? and purchase_t.purchase_finalized = 0 and purchase_t.product_id = product_t.product_id and purchase_t.user_email = user_t.user_email', [vendor], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    });
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

    mysqlconnection.query('select purchase_t.*, product_t.product_name, user_t.user_username from purchase_t, product_t, user_t where purchase_t.vendor_username = ? and purchase_t.product_id = product_t.product_id and purchase_t.user_email = user_t.user_email and purchase_t.user_email in (select user_t.user_email where user_t.user_username = ?)', [vendorUsername, userUsername], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    });
}


