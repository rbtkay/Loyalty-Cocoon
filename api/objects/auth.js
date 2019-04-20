const mysqlConnection = require('../../database/connection');
const jwt = require('jsonwebtoken');

exports.vendorSignUp = (req, res) => {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;
    var name = req.query.name;
    var location = req.query.location;
    var address = req.query.address;

    if (username && email && password && name && location && address) {
        mysqlConnection.query('select user_username from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    res.send('Username Already Exists');
                } else {
                    mysqlConnection.query('insert into user_t (user_username, user_email, user_password, user_name, user_ethAddress, user_isVendor) values (?, ?, ?, ?, ?, 1)', [
                        username,
                        email,
                        password,
                        name,
                        address
                    ], (err) => {
                        if (err) throw err;
                        else {
                            mysqlConnection.query('insert into vendor_t (user_username, vendor_country) values (?, ?)',[username, location],(err)=>{
                            jwt.sign({
                                username: username,
                                email: email,
                                type: 'vendor'
                            }, process.env.JWT_KEY, (err, token) => {
                                res.json({
                                    token
                                })
                            })
                        });
                        }
                    })
                }
            }
        })
    } else {
        res.send('Some fields are missing');
    }
}
//
// exports.vendorAuth = (req, res, next) => {
//     var username = req.query.username;
//     var password = req.query.password;
//
//     if (username && password) {
//         mysqlConnection.query('select * from vendor_t where vendor_username = ? and vendor_password = ?', [username, password], (err, result, fields) => {
//             if (err) throw err;
//             if (result.length > 0) {
//                 const verifyResult = result[0]['vendor_verified'].toJSON();
//                 const isverified = verifyResult.data[0];
//
//                 if (isverified === 0) {
//                     res.status(403).send('Email Confirmation Needed');
//                 }
//                 else {
//                     const token = jwt.sign({
//                         username: result['vendor_username'],
//                         email: result['vendor_email'],
//                         type: "vendor"
//                     },
//                         process.env.JWT_KEY);
//
//                     res.status(200).json({
//                         token,
//                         result
//                     })
//                 }
//             } else {
//                 const errorObj = {
//                     'message': 'Invalid Username/Password'
//                 }
//                 res.status(401).send(errorObj)
//             }
//         });
//     } else {
//         res.status(400).send('Some inputs are missing');
//     }
// }


exports.login = (req, res, next) => {
    var username = req.query.username;
    var password = req.query.password;

    if (username && password) {
        mysqlConnection.query('select * from user_t where user_username = ? and user_password = ?', [username, password], (err, result, fields) => {
            if (err) throw err;
            if (result.length > 0) {
                const verifyResult = result[0]['user_isVerified'].toJSON();
                const isverified = verifyResult.data[0];

                if (isverified === 0) {
                    res.status(403).send('Email Confirmation Needed');
                } else {
                    const isVendor = result[0]['user_isVendor'].toJSON();
                    const type = isVendor.data[0] === 0 ? 'user' : 'vendor' ;
                    console.log(type);
                    const token = jwt.sign({
                        username: result[0].user_username,
                        email: result[0].user_email,
                        type: type
                    },
                    process.env.JWT_KEY);

                    res.status(200).json({
                        token,
                        result
                    });
                }
            } else {
                const errorObj = {
                    "message": "Invalid Username/Password"
                }
                res.status(401).send(errorObj);
            }
        });
    } else {
        res.status(400).send("Some input are missing...");
    }
}

exports.userSignUp = (req, res) => {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;
    var name = req.query.name;
    var dob = req.query.dob;
    var gender = req.query.gender;
    var phone = req.query.phone;
    var prefs = req.query.prefs;
    var address = req.query.address;
    var country = req.query.country;
    var profession = req.query.profession;
    var organization = req.query.organization;

    if (username && password && email && dob && gender && phone && country) {

        mysqlConnection.query('select user_username from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    res.send('already exists');
                } else {
                    mysqlConnection.query('insert into user_t (user_username, user_email, user_password, user_name, user_ethAddress) values ( ?, ?, ?, ?, ?)', [
                        username,
                        email,
                        password,
                        name,
                        address,
                    ], (err) => {
                        if (err) throw err;
                        else {
                            mysqlConnection.query('insert into customer_t (user_username, cust_gender, cust_phone, cust_country, cust_prefs, cust_dob, cust_profession, cust_organization) values (?,?,?,?,?,?,?,?)',[
                                username,
                                gender,
                                phone,
                                country,
                                prefs,
                                dob,
                                profession,
                                organization
                            ], (err)=>{
                                if(err)throw err;
                                else{
                                    jwt.sign({
                                        username: username,
                                        email: email,
                                        type: 'user'
                                    }, process.env.JWT_KEY, (err, token) => {
                                        res.json({
                                            token
                                        });
                                    });
                                }
                            })
                        }
                    })
                }
            }
        })
    } else {
        res.send("Some Fields are Empty");
    }
}
