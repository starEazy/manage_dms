"use strict";

const express = require("express");

const router = express.Router();
const jwt_auth = require("../apps/JWT/jwt_auth");

const MasterController = require("../controllers/MasterController");

router.get("/Master/GetCompanyList", jwt_auth.authenticate,MasterController.GetCompanyList);

module.exports = router;
