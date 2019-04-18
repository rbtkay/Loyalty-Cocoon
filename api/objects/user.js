const mysqlConnection = require("../../database/connection");
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res, next) => {
    mysqlConnection.query('select * from user_t', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getUserByUsername = (req, res, next) => {
    var username = req.query.username;

    mysqlConnection.query('select user_t.*, customer_t.* from user_t, customer_t where user_t.user_username = ? and user_t.user_id = customer_t.user_id', [username], (err, result) => {
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send(err);
        }
    })
}

exports.getUserByEmail = (req, res, next) => {
    var email = req.query.email;

    mysqlConnection.query('select * from user_t where user_email = ?', [email], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getVendorAddress = (req, res, next) => {
    var username = req.query.username;

    mysqlConnection.query('select user_ethAddress from user_t where user_username = ?', [username], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}
