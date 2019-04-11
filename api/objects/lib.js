//password of email: Loyalty11Cocoon
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../../database/connection');

sendEmail = async (username, email, res, type) => {
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'Loyalty.Cocoon',
            pass: 'Loyalty11Cocoon'
        },
    });

    try {
        const emailToken = jwt.sign({
            username: username
        }, 'emailKey');

        const url = `/auth/${emailToken}`;

        var content;
        var code = 0;

        // console.log(content);
        if (type === 'confirm') {
            content = {
                to: email,
                subject: 'Confirm Email',
                html: `<html>
            <head>
            </head>
            <body>

            <div class="container">
              <h2>Confirm Your Email!</h2>
              <p>Welcome to the Cocoon</p>
              <a href='${url}'>www.Loyalty-Cocoon.com</a>

            </div>

            </body>
            </html>`
            }
        } else if (type === 'forgot') {
            code = Math.floor((Math.random() * 10000) + 1000);
            content = {
                to: email,
                subject: 'Forgot Password',
                html: `<html>
            <head>
            </head>
            <body>

            <div class="container">
              <h2>Forgot Password!</h2>
              <p>Here is Your verification Code</p>
              <h3>Code: ${code}</h3>

            </div>

            </body>
            </html>`
            }
        }
        const info = await transporter.sendMail(content);
        if (code !== 0) {
            res.status(200).send({ code });
        } else {
            res.status(200).send('sent');
        }
        console.log("sent the email");
        console.log(info);
    } catch (e) {
        throw e;
    }
}

exports.sendConfirmEmail = async (req, res) => {
    const username = req.query.username;
    var email = req.query.email;
    const type = 'confirm';

    if (email == undefined) {
        mysqlConnection.query('select user_email from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    email = result[0]['user_email'];
                    sendEmail(username, email, res);
                } else {
                    mysqlConnection.query('select vendor_email from vendor_t where vendor_username = ?', [username], (err, result) => {
                        if (err) throw err;
                        else {
                            if (result.length > 0) {
                                email = result[0]['vendor_email'];
                                sendEmail(username, email, res, type);

                            } else {
                                res.status(404).send('Something Unexpected Happend');
                            }
                        }
                    })
                }
            }
        })
    } else {
        sendEmail(username, email, res, type);
    }
}

exports.verifyEmail = (req, res) => {
    const username = req.query.username;

    mysqlConnection.query('select * from user_t where user_username = ?', [username], (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                mysqlConnection.query('update user_t set user_verified = 1 where user_username = ?', [username], (err, result) => {
                    if (err) throw err;
                    else {
                        res.status(200).send('User is verified');
                    }
                })
            } else {
                mysqlConnection.query('update vendor_t set vendor_verified = 1 where vendor_username = ?', [username], (err, result) => {
                    if (err) throw err;
                    else {
                        res.status(200).send('Vendor is verified');
                    }
                })
            }
        }
    })
}

exports.getUsernamesEmails = (req, res) => {
    mysqlConnection.query('select user_t.user_username, vendor_t.vendor_username from user_t, vendor_t', (err, result) => {
        if (err) throw err;
        else {
            let usernames = [];
            result.forEach(element => {
                if (!usernames.includes(element['user_username']))
                    usernames.push(element['user_username']);
                if (!usernames.includes(element['vendor_username']))
                    usernames.push(element['vendor_username']);
            });
            console.log(usernames);

            mysqlConnection.query('select user_t.user_email, vendor_t.vendor_email from user_t, vendor_t', (err, result) => {
                if (err) throw err;
                else {
                    let emails = [];
                    result.forEach(element => {
                        if (!emails.includes(element['user_email']))
                            emails.push(element['user_email']);
                        if (!emails.includes(element['vendor_email']))
                            emails.push(element['vendor_email']);
                    });

                    console.log(emails);
                    res.status(200).send({
                        usernames, emails
                    });
                }
            })
        }
    })
}

exports.sendCode = (req, res) => {
    const email = req.query.email;
    const type = 'forgot';

    mysqlConnection.query('select * from user_t where user_t.user_email = ?', [email], (err, userResult) => {
        if (err) throw err;
        else {
            if (userResult.length > 0) {
                const username = userResult[0]['user_username'];
                sendEmail(username, email, res, type);
            } else {
                mysqlConnection.query('select * from vendor_t where vendor_t.vendor_email = ?', [email], (err, vendorResult) => {
                    if (err) throw err;
                    else {
                        if (vendorResult.length > 0) {
                            const username = vendorResult[0]['vendor_username'];
                            sendEmail(username, email, res, type);
                        } else {
                            res.status(404).send('Not Found');
                        }
                    }
                });
            }
        }
    })
}

exports.changePassword = (req, res) => {
    const password = req.query.password;
    const email = req.query.email;

    mysqlConnection.query('update user_t set user_password = ? where user_email = ?', [password, email], (err, userResult) => {
        if (err) throw err;
        else {
            if (userResult['affectedRows'] > 0) {
                res.status(200).send(userResult);
            } else {
                mysqlConnection.query('update vendor_t set vendor_password = ? where vendor_email = ?', [password, email], (err, vendorResult) => {
                    if (err) throw err;
                    else {
                        if (vendorResult['affectedRows'] > 0) {
                            res.status(200).send(vendorResult);
                        } else {
                            res.status(401).send(vendorResult);
                        }
                    }
                });
            }
        }
    })
}

exports.sendReceiptEmail = async (req, res) => {
    const username = req.query.username;
    const vendorUsername = req.query.vendorUsername;
    const productId = req.query.productId;
    const txHash = req.query.txHash;
    var email = req.query.email;

    mysqlConnection.query('select * from product_t where product_id = ?', [productId] , (err, result) => {
        if (err) throw err;
        else {
            if (email == undefined) {
                mysqlConnection.query('select user_email from user_t where user_username = ?', [username], async (err, newResult) => {
                    if (err) throw err;
                    else {
                        email = newResult[0]['user_email'];
                        const transporter = nodeMailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'Loyalty.Cocoon',
                                pass: 'Loyalty11Cocoon'
                            },
                        });

                        try {
                            const url = `https://rinkeby.etherscan.io/tx/${txHash}`;

                            const info = await transporter.sendMail({
                                to: email,
                                subject: 'Thank You for Shopping @LoyaltyCocoon',
                                html: `
                                <div>
                                <h1>Here is your purchase from ${vendorUsername}</h1>
                                <h4>Product Details</h4>
                                <p>Product ID: ${productId} <br />
                                Name: ${result[0]['product_name']} <br />
                                Price: ${result[0]['product_loco']} LOCO
                                </p>
                                <h5>You can track your transaction at <a href="${url}">${url}</a></h5>
                                </div>
                                `
                            })
                            console.log("sent the email");
                            console.log(info);
                            res.status(200).send('sent');
                        } catch (e) {
                            throw e;
                        }
                    }
                })
            }
        }
    })
}
