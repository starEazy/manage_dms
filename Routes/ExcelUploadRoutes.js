"use strict";

const express = require("express");

const router = express.Router();
const jwt_auth = require("../apps/JWT/jwt_auth");

const ExcelUploadController = require("../controllers/ExcelUploadController");

router.get("/TCP/SystemConfigurationList", jwt_auth.authenticate,ExcelUploadController.SystemConfigurationList);

module.exports = router;
