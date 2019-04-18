const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.getAllVendors = (req, res, next) => {
    mysqlConnection.query('select * from vendor_t', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getVendorByUsername = (req, res, next) => {
    var username = req.query.username;

    mysqlConnection.query('select user_t.*, vendor_t.* from user_t, vendor_t where user_t.user_username = ? and user_t.user_id = vendor_t.user_id', [username], (err, result) => {
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send(err);
        }
    })
}

exports.getCustomerAddress = (req, res, next) => {
    var username = req.query.username;

    mysqlConnection.query('select user_ethAddress from user_t where user_username = ?', [username], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}
