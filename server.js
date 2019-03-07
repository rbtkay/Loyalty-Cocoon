// const { createServer } = require('http');
// const PORT = 3000;
// const next = require('next');
// const express = require('express');

// const mysql = require('mysql');



// const routes = require('./routes');
// const handle = app.getRequestHandler(app);



// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: ""
// });

// // // let kevin = "null";
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // kevin = "kevin";
// });

// app.get('/', function (req, res) {
//     connection.query("select * from User_T", function (err, data) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.json({ user_T: data });
//         }
//     });
// })

// const server = express();

// require("./app/routes")(server, {});

// server.get("*", (req, res) => {
//     return handle(req, res);
// });

// server.listen(PORT, err => {
//     if (err) throw err;
//     console.log(`> Ready on ${PORT}`);
// });

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const server = express();
const next = require('next');
const db = require('./database/connection');


const app = next({
    dev: process.env.NODE_ENV !== 'production'
});


// const routes = require('./routes');
const handle = app.getRequestHandler(app);

app.prepare().then(() => {

    const apiRoutes = require('./api/routes/index');

    server.use("/api", apiRoutes);
    
    server.get("*", (req, res)=>{
        return handle(req,res);
    });
    
    const port = 8000;

    server.listen(port, () => {
        console.log('We are live on ' + port);
    });
})