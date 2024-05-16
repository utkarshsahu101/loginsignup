// routes.js

const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); // Make sure the path is correct
const registerController = require("../controllers/registerController");
const testController = require("../controllers/testController");

// Login route
router.post("/login", loginController.login);
// register route
router.post("/register", registerController.register);
// test route
router.get("/test", testController.test)

module.exports = router;
