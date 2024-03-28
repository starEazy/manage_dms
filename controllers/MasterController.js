'use strict'

const {
  errorResponse,
  successResponse,
} = require('../apps/helpers/customResponseTemplate')
const MasterService = require('../services/MasterService')
const { writeLog } = require('../apps/helpers/utils')

class MasterController extends MasterService {
  constructor() {
    super()
  }

  static async GetCompanyList(req, res) {
    try {
      writeLog("---Start GetCompanyList API----");
      const objResponse = await MasterService.GetCompanyList()
      writeLog("---GetCompanyList API Json Response----" + objResponse.dtList);
      return successResponse(req, res,"successfully completed.", objResponse.dtList)
    } catch (error) {
      return errorResponse(req, res, error.message, null)
    }
  }
}

module.exports = MasterController
