"use strict";

const express = require("express");

const router = express.Router();
const jwt_auth = require("../apps/JWT/jwt_auth");

const DashboardController = require("../controllers/DashboardController");

router.get("/Dashboard/GetAllChartList", jwt_auth.authenticate,DashboardController.AllChartList);

module.exports = router;
