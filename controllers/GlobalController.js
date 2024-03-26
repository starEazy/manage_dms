'use strict'

const joiSchema = require('../apps/ValidateBody/schema')
const {
  commonApiResponse,
  errorResponse,
  successResponse,
  internalServerErrorResponse,
} = require('../apps/helpers/customResponseTemplate')
const GlobalService = require('../services/GlobalService')
const { writeLog } = require('../apps/helpers/utils')
const { Jwt } = require('../apps/JWT/jwt')
const { buildLoginToken } = require('../apps/JWT/encrypt-decrypt')
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class GlobalController extends GlobalService {
  constructor() {
    super()
  }

  static async MenuList(req, res) {
    writeLog('---Start Login Authentication----')
    try {
      const tokenDetails = req.user;
      let list = await GlobalService.GetMenuList(tokenDetails)
      return successResponse(req, res, 'Login Successfully', list)
    } catch (error) {
        console.log(error);
      return errorResponse(req, res, error.message, null)
    }
  }
}

module.exports = GlobalController
