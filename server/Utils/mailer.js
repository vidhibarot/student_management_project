
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

const mailOptions = {
  from: process.env.MAIL_EMAIL, 
  to: '', 
  subject: 'Welcome to Admin Pannel', 
  text: '', 
};

class Mailer {

  async sendUserEmailAndPassword(data) {
    mailOptions.to = data?.email;
    mailOptions.subject = "Your Email and Password";
    if (data) {
      delete mailOptions.text;
      mailOptions.html = `<p> Hi, Your Username and Password is </p> <p> Username: <strong>${data?.username}</strong> </p> <p> Password: <strong>${data?.password}</strong> </p>`;

    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info?.response);
      }
    });
  }

}


module.exports = Mailer;

