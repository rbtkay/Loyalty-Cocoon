//password of email: Loyalty11Cocoon
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../../database/connection');

exports.sendEmail = async (username, email, res, type) => {

    console.log('in the email function: ', email);

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

        const head = `${process.env.NODE_ENV ? 'https://loyalty-cocoon.appspot.com' : 'http://localhost:8000'}`

        const querySring = `/auth/${emailToken}`;

        const url = head + querySring;

        var content;
        var code = 0;

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
              <a href='${url}'>www.loyalty-cocoon.com</a>

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
              <p>Here is your verification code</p>
              <h3>Code: ${code}</h3>

            </div>

            </body>
            </html>`
            }
        } else if (type === 'refer') {
            const token = jwt.sign({ email: email }, 'emailKey');
            const boostUrl = process.env.NODE_ENV ? `https://loyalty-cocoon.appspot.com/user/signup/${token}` : `http://localhost:8000/user/signup/${token}`;
            content = {
                to: email,
                subject: `Loyalty Cocoon Referral`,
                html: `<html>
                <head>
                </head>

                <body>
                <div class="container">
                    <h2>Redeem and start shopping!</h2>
                    <p>Congratulations! You have been referred by <b>${username}</b> to join our evergrowing <i>Cocoon</i>. Click on the link below and register to redeem your headstarting <b><i>LOCO</i></b>.</p> <br />
                    <h3><a href=${boostUrl}>https://www.loyalty-cocoon.com</a></h3>
                </div>
                </body>
                </html>`
            }
        } else if (type === 'delete') {
            const token = jwt.sign({ email: email }, 'emailKey');
            const boostUrl = process.env.NODE_ENV ? `https://loyalty-cocoon.appspot.com/user/signup/${token}` : `http://localhost:8000/user/signup/${token}`;
            content = {
                to: email,
                subject: `Account Deletion`,
                html: `<html>
                <head>
                </head>

                <body>
                <div class="container">
                    <h2>We're Sorry to see you leave the Cocoon</h2>
                    <p>This Account no longer Exists</p><br />
                    <span>To Recover your Account, Contact Us at Loyalty.Cocoon@gmail.com</span>
                </div>
                </body>
                </html>`
            }
            const info = await transporter.sendMail(content);
            if (code !== 0) {
                res.status(200).send({ code });
            } else {
                res.status(200).send('sent');
            }
        }
    } catch (e) {
        throw e;
    }
}

exports.sendConfirmEmail = async (req, res) => {
    const { username, email } = req.query;
    const type = 'confirm';

    if (!email) {
        mysqlConnection.query('select user_email from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    const mail = result[0]['user_email'].toString();
                    sendEmail(username, mail, res, type);
                } else {
                    res.status(404).send('Something Unexpected Happened...');
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
                mysqlConnection.query('update user_t set user_isVerified = 1 where user_username = ?', [username], (err, result) => {
                    if (err) throw err;
                    else {
                        res.status(200).send('User is verified');
                    }
                })
            } else {
                res.status(404).send('Something Unexpected Happened...');
            }
        }
    })
}

exports.getUsernamesEmails = (req, res) => {
    mysqlConnection.query('select user_username, user_email from user_t', (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                let usernames = [];
                let emails = [];
                result.forEach(element => {
                    usernames.push(element['user_username'].toLowerCase());
                    emails.push(element['user_email'].toLowerCase());
                });
                console.log(usernames);
                res.status(200).send({ usernames, emails });
            } else {
                res.status(404).send('Something Unexpected Happened...');
            }
        }
    })
}

exports.sendCode = (req, res) => {
    const email = req.query.email;
    const type = 'forgot';

    mysqlConnection.query('select * from user_t where user_email = ?', [email], (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                const username = result[0]['user_username'];
                sendEmail(username, email, res, type);
            } else {
                res.status(404).send('Something Unexpected Happened...');
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
                res.status(404).send('Something Unexpected Happened...');
            }
        }
    })
}

exports.sendReceiptEmail = async (req, res) => {
    const { username, vendorUsername, productId, txHash } = req.query;
    let email;
    mysqlConnection.query('select * from product_t where product_id = ?', [productId], (err, result) => {
        if (err) throw err;
        else {
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
                            <h2>Here is your purchase from ${vendorUsername}</h2>
                            <h3>Product Details</h3>
                            <p>Product ID: ${productId} <br />
                            Name: ${result[0]['product_name']} <br />
                            Price: ${result[0]['product_loco']} LOCO
                            </p>
                            <h4>You can track your transaction at <a href="${url}">${url}</a></h4>
                            </div>
                            `
                        })
                        res.status(200).send('sent');
                    } catch (e) {
                        throw e;
                    }
                }
            })
        }
    })
}

exports.sendReferral = async (req, res) => {
    const { email, vendorUsername } = req.query;

    try {
        mysqlConnection.query('select user_email from user_t where user_email = ?', [email], (err, result) => {
            if (result.length > 0) {
                res.status(409).send(err);
            } else {
                sendEmail(vendorUsername, email, res, 'refer');
            }
        })
    } catch (err) {
        res.status(404).send('Something Unexpected Happened');
    }

}
