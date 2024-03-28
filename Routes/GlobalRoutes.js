"use strict";

const express = require("express");

const router = express.Router();
const jwt_auth = require('../apps/JWT/jwt_auth')


const GetUserController = require("../controllers/GlobalController");



router.get("/GetUserList",  GetUserController.getUserList);

router.get("/GetUserRoleList/:FormId", jwt_auth.authenticate,  GetUserController.getUserRoleList);

router.get("/GenerateNewCode/:id", jwt_auth.authenticate, GetUserController.generateNewCode);


 


module.exports = router;
