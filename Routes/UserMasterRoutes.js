"use strict";

const express = require("express");

const router = express.Router();

const UserMasterController = require("../controllers/UserMasterController");

router.get("/GetChannelPartnerList", UserMasterController.getChannelPartnerList);

module.exports = router;
