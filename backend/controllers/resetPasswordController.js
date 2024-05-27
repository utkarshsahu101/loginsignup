const bcrypt = require("bcrypt");
const { verifyToken } = require("../utils/jwtHelper");
const User = require("../models/User");

exports.resetPassword = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1]
  const { email, password } = req.body;
  try {
    // verify the token sent by the user
    const decodedToken = verifyToken(token);

    // if the token is invalid
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // find the user with the id from the token
    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }

    // Hash the new password
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // update user's password, clear reset token and expiration time
    // user.password = hashedPassword;
    user.password = password;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });
  } catch (error) {
    // send error response if any error occurs
    res.status(401).send({ message: error.message });
  }
};
