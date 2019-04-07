//password of email: Loyalty11Cocoon
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../../database/connection');

sendEmail = async (username, email, res) => {
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

        const url = `http://localhost:8000/auth/${emailToken}`;

        const info = await transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `Please Click on the link to Confirm email:<br/> <a href="${url}">${url}</a>`
        })

        console.log("sent the email");
        console.log(info);
        res.status(200).send('sent');
    } catch (e) {
        throw e;
    }
}

exports.sendConfirmEmail = async (req, res) => {
    const username = req.query.username;
    var email = req.query.email;

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
                                sendEmail(username, email, res);
                            } else {
                                res.status(404).send('Something Unexpected Happend');
                            }
                        }
                    })
                }
            }
        })
    } else {
        sendEmail(username, email, res);
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
