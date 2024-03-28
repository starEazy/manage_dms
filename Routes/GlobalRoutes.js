"use strict";

const express = require("express");

const router = express.Router();

const GlobalController = require("../controllers/GlobalController");

router.get("/CountryList", GlobalController.countryList);

module.exports = router;
