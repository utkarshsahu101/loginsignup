// middleware/auth.js

const jwt = require("jsonwebtoken");
const secretKey = '123e4567-e89b-12d3-a456-426614174000';

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed try Again" });
  }
};
