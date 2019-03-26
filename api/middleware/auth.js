const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    console.log("req.headers");
    console.log(req.headers);

    const token = req.headers['authorization'];

    try {
        // const decoded = decode(token);
        // const type = decode.type;
        // console.log("user type" + type);

        const decoded = jwt.verify(token, "secretKey");
        // console.log("decoded email");
        // console.log(decoded); //{username, email, type, iat}
        const userType = decoded.type;
        // const userData = decoded;

        // console.log("url");
        // console.log(req.originalUrl); // /api/product/offered

        // if (userData.type === 'regular') {

        // } else if (userData.type === 'vendor') {

        // }
        const url = req.originalUrl;

        const type = url.split('/')[2];
        console.log("req.originalUrl");

        if (userType === type) {
            console.log(type);
            next();
        }else{
            return res.status(401).send('Auth Failed');
        }

    } catch (err) {
        res.status(401).send("Auth Failed");
    }

}