const mysqlconnection = require('../../database/connection');

exports.getPurchasesByVendor = (req, res) => {
    const { vendorUsername } = req.query;

    mysqlconnection.query(`select * from purchase_t where vendor_username = ?`, [vendorUsername], (result, err) => {
        if (err) throw err;

        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No Result Found');
        }
    })
}