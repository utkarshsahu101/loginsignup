const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtHelper");
const secretKey = "123e4567-e89b-12d3-a456-426614174000";

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // const validatePassword = await bcrypt.compare(password, user.password);

    // if (!validatePassword) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Invalid email or password" });
    // }
    
    // Create a JWT token
    const token = generateToken(user)
    // const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    //   expiresIn: "1h",
    // });

    // If user found and password matches
    return res
      .status(200)
      .json({ success: true, message: "User logged in", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
