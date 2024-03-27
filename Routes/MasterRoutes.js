"use strict";

const express = require("express");

const router = express.Router();

const MasterController = require("../controllers/MasterController");

router.get("/GetCompanyDetails/:companyId", MasterController.getCompanyDetails);

module.exports = router;
