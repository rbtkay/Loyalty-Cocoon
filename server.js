const express = require('express');
const server = express();
const next = require('next');
const session = require('express-session');
const routes = require('./routes');
var compression = require('compression');
const path = require('path');
require('dotenv').config();


const app = next({ dev: process.env.NODE_ENV !== 'production' });

const port = process.env.PORT ? process.env.PORT : 3000;

const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
    server.use(compression());
    server.set('trust proxy', true);
    const apiRoutes = require('./api/routes/index');
    server.get(/next/, (req,res)=> { handle(req,res); });
    // server.get(/webpack/, (req,res)=> { handle(req,res); });

    server.use(session({secret: 'un truc bizarre', saveUninitialized: true, resave: true}));
    server.use("/api", apiRoutes);
    server.get("*", (req, res)=>{
        // res.setHeader('Access-Control-Allow-Origin', 'http://loyaltycocoon.eastus.cloudapp.azure.com:8000');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATH, DELETE');
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
        // console.log('headers: ', res.headers);
        return handle(req,res);
    });

    server.listen(port, () => {
        console.log('We are live on ' + port);
        console.log('el path', process.env.PATH);
    });
})
