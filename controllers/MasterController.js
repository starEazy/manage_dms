'use strict'

const joiSchema = require('../apps/ValidateBody/schema')
const {
  commonApiResponse,
  errorResponse,
  successResponse,
  internalServerErrorResponse,
} = require('../apps/helpers/customResponseTemplate')
const MasterService = require('../services/MasterService')
const { writeLog } = require('../apps/helpers/utils')
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class MasterController extends MasterService {
  constructor() {
    super()
  }

  static async getCompanyDetails(req, res) {    

    let companyId = req.params.companyId
    let objResponse = ""
    try {
       
        objResponse = await super.getCompanyDetails(companyId);
       
        writeLog("---GetCompanyDetails API Json Response---- ", objResponse);
        // return commonApiResponse(req, objResponse, true, "successfully completed.", 0, 200);
        return successResponse(req, res, "Successfully completed", objResponse)        
    } catch (error) {
        writeLog("---GetCompanyDetails Error----", error.message);
        // return commonApiResponse(req, null, false, error.message, 0, 500);
        return errorResponse(req, res, error.message, objResponse)
    }
}
  
}

module.exports = MasterController
