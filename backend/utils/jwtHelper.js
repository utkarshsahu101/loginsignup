const jwt = require("jsonwebtoken");
const secretKey = "123e4567-e89b-12d3-a456-426614174000";

const generateToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
module.exports = { generateToken, verifyToken };
