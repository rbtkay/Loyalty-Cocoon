const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.getAllVendors = (req, res, next) => {
    mysqlConnection.query('select * from Vendor_T', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.authVendor = (req, res, next) => {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        mysqlConnection.query('select * from Vendor_T where vendor_username = ? and vendor_password = ?', [username, password], (err, result, fields) => {
            if (err) throw err;
            if (result.length > 0) {
                jwt.sign({ result }, 'secretKey', (err, token) => {
                    res.json({
                        token,
                        result
                    })
                })
            } else {
                const errorObj = {
                    'message': 'Invalid Username/Password'
                }
                res.send(errorObj)
            }
        });
    } else {
        res.send('Some inputs are missing');
    }
}

exports.signUp = (req, res) => {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;
    var name = req.query.name;
    var phone = req.query.phone;
    var location = req.query.location;
    var address = req.query.address;

    if (username && email && password && name && phone && location && address) {
        mysqlConnection.query('select vendor_username from vendor_t where vendor_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    res.send('Username taken');
                } else {
                    mysqlConnection.query('insert into vendor_t (vendor_username, vendor_email, vendor_password, vendor_name, vendor_phone, vendor_location, vendor_address) values (?, ?, ?, ?, ?, ?, ?)', [
                        username,
                        email,
                        password,
                        name,
                        phone,
                        location,
                        address
                    ], (err, result) => {
                        if (err) throw err;
                        else {
                            jwt.sign({ result }, 'secretKey', (err, token) => {
                                res.json({
                                    token,
                                    result
                                })
                            })
                        }
                    })
                }
            }
        })
    } else {
        res.send('Some fields are missing');
    }
}
