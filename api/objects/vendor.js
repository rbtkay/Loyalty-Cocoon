const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.getAllVendors = (req, res, next) => {
    mysqlConnection.query('select * from Vendor_T', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}
