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

        const url = `http://localhost:8000/${emailToken}`;

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

    console.log(email);

    if (email == undefined) {
        console.log('in the if');
        mysqlConnection.query('select user_email from user_t where user_username = ?', [username], (err, result) => {
            if (err) throw err;
            else {
                if (result.length > 0) {
                    email = result[0]['user_email'];
                    sendEmail(username, email, res);
                } else {
                    console.log('in the vendor query');
                    mysqlConnection.query('select vendor_email from vendor_t where vendor_username = ?', [username], (err, result) => {
                        if (err) throw err;
                        else {
                            if (result.length > 0) {
                                email = result[0]['vendor_email'];
                                console.log(email)
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