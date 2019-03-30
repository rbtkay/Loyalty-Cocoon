const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.vendorSignUp = (req, res) => {
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

exports.vendorAuth = (req, res, next) => {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        mysqlConnection.query('select * from Vendor_T where vendor_username = ? and vendor_password = ?', [username, password], (err, result, fields) => {
            if (err) throw err;
            if (result.length > 0) {
                const token = jwt.sign(
                    {
                        username: result['vendor_username'],
                        email: result['vendor_email'],
                        type: "vendor"
                    },
                    'secretKey');

                res.status(200).json({
                    token,
                    result
                })
            } else {
                const errorObj = {
                    'message': 'Invalid Username/Password'
                }
                res.status(401).send(errorObj)
            }
        });
    } else {
        res.status(400).send('Some inputs are missing');
    }
}


exports.userAuth = (req, res, next) => {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        mysqlConnection.query('select * from User_T where user_username = ? and user_password = ?', [username, password], (err, result, fields) => {
            if (err) throw err;
            if (result.length > 0) {
                console.log(result[0].user_username);
                const token = jwt.sign(
                    {
                        username: result[0].user_username,
                        email: result[0].user_email,
                        type: "user"
                    },
                    'secretKey');

                console.log("token:" + token);

                res.status(200).json({
                    token,
                    result
                });
            } else {
                const errorObj = {
                    "message": "Invalid Username/Password"
                }
                res.status(401).send(errorObj);
            }
        });
    }
    else {
        res.status(400).send("Some input are missing...");
    }
}

exports.userSignUp = (req, res) => {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;
    var name = req.query.name;
    var dob = req.query.dob;
    var gender = req.query.gender;
    var phone = req.query.phone;
    var prefs = req.query.prefs;
    var address = req.query.address;
    var country = req.query.country;
    var profession = req.query.profession;
    var organization = req.query.organization;

    if (username && password && email && dob && gender && phone && country) {

        mysqlConnection.query('select user_username from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    console.log('checked');
                    res.send('already exists');
                } else {
                    mysqlConnection.query('insert into user_t values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        username,
                        email,
                        password,
                        name,
                        dob,
                        gender,
                        phone,
                        prefs,
                        address,
                        country,
                        profession,
                        organization
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
        res.send("Some Fields are Empty");
    }
}