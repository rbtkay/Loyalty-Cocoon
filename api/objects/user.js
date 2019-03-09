const mysqlConnection = require("../../database/connection");


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
    var email = req.query.email;
    var password = req.query.password;

    if (email && password) {
        mysqlConnection.query('select * from User_T where user_email = ? and user_password = ?', [email, password], (err, result, fields) => {
            if (err) throw err;
            if(result.length > 0){
                res.send(result);
            }else{
                res.redirect("/");
            }
        });
    }
    else{
        res.send("Some input are missing...");
    }
}
