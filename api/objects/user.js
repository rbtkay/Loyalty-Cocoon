const mysqlConnection = require("../../database/connection");
const jwt = require('jsonwebtoken');
const lib = require('./lib');

exports.getAllUser = (req, res) => {
    mysqlConnection.query('select * from user_t', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getUserByUsername = (req, res) => {
    var username = req.query.username;

    mysqlConnection.query('select user_t.*, customer_t.* from user_t, customer_t where user_t.user_username = ? and user_t.user_id = customer_t.user_id', [username], (err, result) => {
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send(err);
        }
    });
}

exports.getUserByEmail = (req, res) => {
    var email = req.query.email;

    mysqlConnection.query('select * from user_t where user_email = ?', [email], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getVendorAddress = (req, res) => {
    var username = req.query.username;

    mysqlConnection.query('select user_ethAddress from user_t where user_username = ?', [username], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.updateUser = (req, res) => {
    const { username, email, name, password, gender, phone, country, profession, organization, profile } = req.query;

    mysqlConnection.query('update user_t, customer_t set user_t.user_username = ?, user_t.user_email = ?, user_t.user_name = ?, user_t.user_password = ?, customer_t.cust_gender = ?, customer_t.cust_phone = ?, customer_t.cust_country = ?, customer_t.cust_profession = ?, customer_t.cust_organization = ? where user_t.user_username = ? and user_t.user_id = customer_t.user_id', [username, email, name, password, gender, phone, country, profession, organization, profile], (err, result) => {
        if (err) {
            res.status(404).send('Something Went Wrong');
        } else {
            res.status(200).send('Account Updated Successfully');
        }
    });
}

exports.deleteAccount = (req, res) => {
    const { id } = req.query;

    mysqlConnection.query('UPDATE user_t SET user_isDeleted = 1 WHERE user_id = ?', [id], (err) => {
        if (err) throw err;
        lib.sendEmail();
        res.status(200).send('Account Deleted');
    })
}
