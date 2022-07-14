const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Token = require('../models/Token')

const AuthController = require('../controller/auth')
const UserController = require('../controller/user');
const { checkAuth } = require("../middleware/auth");

router.use(express.json());

router.post("/refreshAuthToken", AuthController.refreshToken);

router.post("/signup", UserController.userSignup);

router.post("/login", UserController.userLogin);

router.delete("/users/:userId", checkAuth, UserController.userDelete);

router.post("/logout", checkAuth, UserController.userLogout);

module.exports = router;