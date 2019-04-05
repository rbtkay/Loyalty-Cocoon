//password of email: Loyalty11Cocoon 
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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

        // const emailToken = "wefd";

        const url = `http://localhost:8000/${emailToken}`;

        const info = await transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `Please Click on the link to Confirm email:<br/> <a href="${url}">${url}</a>`
            // html: 'rawa2 rawa2 ya bro, testing some stuff! and apparently it works!!!'
        })

        console.log("sent the email");
        console.log(info);
        res.status(200).send('sent');
    } catch (e) {
        throw e;
    }
}