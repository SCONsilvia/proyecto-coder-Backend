const {createTransport} = require("nodemailer");

const transporter = createTransport({
    //host: "smtp.gmail.com"
    service: "gmail",
    port: process.env.PORT_GMAIL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

module.exports = {transporter} ;

