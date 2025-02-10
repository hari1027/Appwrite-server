const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send ("Api connected")
})

function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hari04harry@gmail.com',
        pass: 'kqmw kgxc cfbg qmkl',
    },
});

app.post('/send-email', (req, res) => {
    const { email } = req.body;
    const token = generateToken();

    const mailOptions = {
        from: 'hari04harry@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `your token is : ${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: "Error sending email" });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({ message: "Email sent", token: token });
        }
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});