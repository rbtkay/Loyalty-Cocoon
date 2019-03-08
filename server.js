const express = require('express');
const server = express();
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

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