const mysqlConnection = require("../../database/connection");
const jwt = require('jsonwebtoken');


exports.getAllUser = (req, res, next) => {
    mysqlConnection.query('select * from User_T', (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}

exports.getUserByEmail = (req, res, next) => {

    var email = req.query.email;

    mysqlConnection.query('select * from User_T where user_email = ?', [email], (err, result, fields) => {
        if (err) throw err;
        res.send(result);
    });
}
