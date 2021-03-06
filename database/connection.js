const mysql = require('mysql');
const dotenv = require('dotenv').config();

let connection;

if (process.env.NODE_ENV) {
    connection = mysql.createConnection({
        host: "34.65.77.182",
        user: "root",
        password: "",
        database: "cocoondb",
        port: 3306
    });
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "cocoondb",
        port: 3306
    });
}

connection.connect((err)=>{
    if(err) throw err;
});

module.exports = connection;
