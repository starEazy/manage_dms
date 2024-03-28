'use strict'

const joiSchema = require('../apps/ValidateBody/schema')
const {
  commonApiResponse,
  errorResponse,
  successResponse,
  internalServerErrorResponse,
} = require('../apps/helpers/customResponseTemplate')
const UserMasterService = require('../services/UserMasterService')
const { writeLog } = require('../apps/helpers/utils')
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class UserMasterController extends UserMasterService {
  constructor() {
    super()
  }

  static async getChannelPartnerList(req, res) {
      
    let objCompanyListResponse = ""
    try {
       objCompanyListResponse = await super.getChannelPartnerList();
      writeLog("---GetChannelPartnerList API Json Response----", objCompanyListResponse);
      // return commonApiResponse(req, objCompanyListResponse, true, "Successfully completed.", 0, 200); // Assuming CommonResultFilter handles HTTP response
      return successResponse(req, res, "Successfully completed", objCompanyListResponse)      
    } catch (error) {
        writeLog("Error in GetChannelPartnerList API:", error.message);
      // return commonApiResponse(req, null, false, error.message, 0, 500); // Assuming CommonResultFilter handles HTTP response
      return errorResponse(req, res, error.message, objCompanyListResponse)
    }
  }

}

module.exports = UserMasterController
