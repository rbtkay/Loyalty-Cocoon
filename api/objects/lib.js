//password of email: Loyalty11Cocoon 
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../../database/connection');

exports.sendConfirmEmail = async (req, res) => {
    const username = req.query.username;
    const email = req.query.email;

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

exports.verifyEmail = (req, res) => {
    const username = req.query.username;

    mysqlConnection.query('update user_t set user_verified = 1 where user_username = ?', [username], (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send('User is verified');
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