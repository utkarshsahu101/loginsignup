const jwt = require("jsonwebtoken");
const secretKey = "123e4567-e89b-12d3-a456-426614174000";

const generateToken = (user, expirationTime = "1h") => {
  return jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    expiresIn: expirationTime,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};
module.exports = { generateToken, verifyToken };
