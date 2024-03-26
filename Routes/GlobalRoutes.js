"use strict";

const express = require("express");

const router = express.Router();
const jwt_auth = require("../apps/JWT/jwt_auth");

const GlobalController = require("../controllers/GlobalController");

router.get("/Global/ModuleList", jwt_auth.authenticate,GlobalController.MenuList);

module.exports = router;
