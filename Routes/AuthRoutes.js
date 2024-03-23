"use strict";

const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/SignIn", AuthController.SignIn);

module.exports = router;
