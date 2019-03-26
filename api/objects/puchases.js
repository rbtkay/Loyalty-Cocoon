const mysqlconnection = require('../../database/connection');

exports.getPurchasesByVendor = (req, res) => {
    const vendor = req.query.username;

    mysqlconnection.query('select * from purchase_t where vendor_username = ?', [vendor], (err, result) => {
        if (err) throw err;
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


