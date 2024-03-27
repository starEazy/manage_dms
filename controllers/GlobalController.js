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
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class GlobalController extends GlobalService {
  constructor() {
    super()
  }

  static async  countryList(req, res) {
    // const objResponse = new CountryResponse();
    let objResponse = ""
    try {
      
      writeLog("--Start CountryList API----");
      objResponse = await super.getCountryList();
      writeLog("CountryList Result : ", objResponse);      
      return successResponse(req, res, "Successfully", objResponse)
            
    } catch (error) {
      writeLog("Error in CountryList API:", error.message);
      // return  commonApiResponse(req, null, false, error.message, 0, 500); // Assuming CommonResultFilter handles HTTP response
      return errorResponse(req, res, error.message, objResponse)
    }
  }

}

module.exports = GlobalController
