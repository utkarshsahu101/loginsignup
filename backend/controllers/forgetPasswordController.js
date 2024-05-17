const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { generateToken } = require("../utils/jwtHelper");

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });

    // if user not found, send error message
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create a JWT token
    const token = generateToken(user, "10m");
    // send token to the user's email
    const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "utkarsh103sahu@gmail.com",
        pass: "qkbk efrx aagh lqma",
      },
    });
    transporter.verify().then(console.log).catch(console.error);

    // email configuration
    const mailOptions = {
      from: "utkarsh103sahu@gmail.com",
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
          <p>Click on the following link to reset your password:</p>
          <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
          <p>The link will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      console.log("first", err, info);
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
