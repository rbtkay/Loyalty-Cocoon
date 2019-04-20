const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');
const lib = require('./lib');

exports.getAllVendors = (req, res) => {
    mysqlConnection.query('select * from vendor_t', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getVendorByUsername = (req, res) => {
    var username = req.query.username;

    mysqlConnection.query('select user_t.*, vendor_t.* from user_t, vendor_t where user_t.user_username = ? and user_t.user_id = vendor_t.user_id', [username], (err, result) => {
        if (result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).send(err);
        }
    });
}

exports.getCustomerAddress = (req, res) => {
    var username = req.query.username;

    mysqlConnection.query('select user_ethAddress from user_t where user_username = ?', [username], (err, result, fields) => {
        if (err) throw err;
        res.status(200).send(result);
    });
}

exports.updateVendor = (req, res) => {
    const { username, email, name, password, country, city, street, building, profile } = req.query;

    mysqlConnection.query('update user_t, vendor_t set user_t.user_username = ?, user_t.user_email = ?, user_t.user_name = ?, user_t.user_password = ?, vendor_t.vendor_country = ?, vendor_t.vendor_city = ?, vendor_t.vendor_street = ?, vendor_t.vendor_building = ? where user_t.user_username = ?', [username, email, name, password, country, city, street, building, profile], (err, result) => {
        if (err) {
            res.status(404).send('Something Went Wrong');
        } else {
            res.status(200).send('Account Updated Successfully');
        }
    });
}

exports.deleteAccount = (req, res) => {
    const { id } = req.query;

    mysqlConnection.query('UPDATE user_t SET user_t.user_isDeleted = 1 WHERE user_t.user_id = ?', [id], (err, result) => {
        if (err) throw err;
        mysqlConnection.query('UPDATE product_t SET product_t.product_isDeleted = 1, product_t.product_isOffered = 0 WHERE product_t.user_id = ?', [id], (err) => {
            if (err) throw err;
            lib.sendEmail();
            res.status(200).send(' Account Deleted');
        })
    })
}