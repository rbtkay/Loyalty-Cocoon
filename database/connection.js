const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "mysqlfirst"
});

connection.connect((err)=>{
    if(err) throw err;
});

module.exports = connection;
