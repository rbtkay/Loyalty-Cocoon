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
                // req.session.username = username;
                // console.log(req.session.username);
                // res.send(result);
                jwt.sign({ result }, 'secreKey', (err, token) => {
                    res.json({
                        token,
                        username
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
