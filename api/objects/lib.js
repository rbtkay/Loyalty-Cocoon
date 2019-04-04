//password of email: Loyalty11Cocoon 
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.sendConfirmEmail = (req, res) => {
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

        // const emailToken = "wefd";

        const url = `http://localhost:8000/${emailToken}`;

        transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `Please Click on the link to Confirm email:<br/> <a href="${url}">${url}</a>`
        })
        console.log("sent the email");
        res.status(200).send('sent');
    } catch (e) {
        throw e;
    }
}