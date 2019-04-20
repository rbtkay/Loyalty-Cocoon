const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.getAllVendors = (req, res, next) => {
    mysqlConnection.query('select * from vendor_t', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getCustomerAddress = (req, res, next) => {
    var username = req.query.username;

    mysqlConnection.query('select user_ethAddress from user_t where user_username = ?', [username], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.deleteAccount = (req, res) => {
    const { id } = req.query;

    mysqlConnection.query('UPDATE user_t SET user_t.user_isDeleted = 1 WHERE user_t.user_id = ?', [id], (err, result) => {
        if (err) throw err;
        mysqlConnection.query('UPDATE product_t SET product_t.product_isDeleted = 1, product_t.product_isOffered = 0 WHERE product_t.user_id = ?', [id], (err) => {
            if (err) throw err;
            res.status(200).send(' Account Deleted');
        })
    })
}

