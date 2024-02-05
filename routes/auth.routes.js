const express = require("express");
const authControllers = require("../controllers/auth.controller");

const router = express.Router();

router.get("/signup", authControllers.getSignup);

router.post("/signup", authControllers.signup);

router.get("/login", authControllers.getLogin);

router.post("/login", authControllers.login);

router.post("/logout", authControllers.logout);

module.exports = router;
