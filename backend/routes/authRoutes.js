// routes.js

const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController"); // Make sure the path is correct
const registerController = require("../controllers/registerController");
const testController = require("../controllers/testController");
const forgetPasswordController = require("../controllers/forgetPasswordController");

// Login route
router.post("/login", loginController.login);
// register route
router.post("/register", registerController.register);
// test route
router.get("/test", testController.test)
// forget password route
router.post("/forgetPassword", forgetPasswordController.forgetPassword)

module.exports = router;
