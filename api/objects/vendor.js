const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.getAllVendors = (req, res, next) => {
    mysqlConnection.query('select * from Vendor_T', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getUserAddress = (req, res, next) => {
    var username = req.query.username;

    mysqlConnection.query('select user_address from user_t where user_username = ?', [username], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}
