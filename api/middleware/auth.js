const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    const token = req.headers['authorization'];

    try {
        const decoded = jwt.verify(token, "secretKey");
        const userType = decoded.type;

        const url = req.originalUrl;

        const type = url.split('/')[2];

        if (userType === type) {
            next();
        } else {
            return res.status(401).send('Auth Failed');
        }
    } catch (err) {
        res.status(401).send("Auth Failed");
    }
}
