//password of email: Loyalty11Cocoon 
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'Loyalty.Cocoon',
        pass: 'Loyalty11Cocoon'
    },
});

try {
    const emailToken = jwt.sign({
        username: 'kevin'
    }, 'emailKey');

    // const emailToken = "wefd";

    const url = `http://localhost:8000/${emailToken}`;

    transporter.sendMail({
        to: 'kevin.boghossian@gmail.com',
        subject: 'Confirm Email',
        html: `Please Click on the link to Confirm email:<br/> <a href="${url}">${url}</a>`
    })
} catch (e) {
    throw e;
}