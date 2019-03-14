exports.verifyToken = (req, res, next) => {
    // console.log('in the middleware');
    // if(!req.session.username){
    //     res.json("404, NOT FOUND");
    // }
    // if(typeof req.session !== undefined){
    // }
    // res.json("404, NOT FOUND");
    // res.setHeader['']
    // res.redirect('../');
    // console.log("response in the middleWare:" + res.query);
    // res.writeHead(200, { 'Content-Type': 'text/event-stream' });
    // if (typeof req.session.username === 'undefined') {
    //     console.log('no Session');
    //     req.session.isAuth = false;
    //     // res.send({ isAuth: false });
    //     // res.render('signin');
    // }

    // Get auth header value
    const header = req.headers['authorization'];
    // // Check if bearer is undefined
    if (typeof header !== 'undefined') {
        // // Split at the space
        // const bearer = bearerHeader.split(' ');
        // // Get token from array
        // const bearerToken = bearer[1];
        // // Set the token
        // req.token = bearerToken;
        // Next middleware
        // console.log('bearerHeader' + bearerHeader);
        next();
    } else {
        // Forbidden
        res.send("404");
    }

    // console.log("session in the middleWare:" + req.session);


    // if (typeof req.session.username === undefined) {
    //     // res.redirect('/signin');
    //     res.json('404 Not Found');
    // } else {
    // }
}