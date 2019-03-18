const mysqlConnection = require("../../database/connection");
const jwt = require('jsonwebtoken');


exports.getAllUser = (req, res, next) => {
    mysqlConnection.query('select * from User_T', (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
}

exports.getUserByEmail = (req, res, next) => {

    var email = req.query.email;

    mysqlConnection.query('select * from User_T where user_email = ?', [email], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
}

exports.authUser = (req, res, next) => {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        mysqlConnection.query('select * from User_T where user_username = ? and user_password = ?', [username, password], (err, result, fields) => {
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
                    "message": "Invalid Username/Password"
                }
                res.send(errorObj);
            }
        });
    }
    else {
        res.send("Some input are missing...");
    }
}

exports.signUp = (req, res) => {
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

        //TODO: verify that the user exist.
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
