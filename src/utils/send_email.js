const nodemailer = require("nodemailer");
const sendEmail = async(email) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AUTH_EMAIL,
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: 'abrarjahinayat123@gmail.com',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
};

module.exports = sendEmail;
