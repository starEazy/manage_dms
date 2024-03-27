'use strict'

const {
  errorResponse,
  successResponse,
} = require('../apps/helpers/customResponseTemplate')
const MasterService = require('../services/MasterService')
const { writeLog } = require('../apps/helpers/utils')
const ExcelUploadService = require('../services/ExcelUploadSevice')

class ExcelUploadController extends ExcelUploadService {
  constructor() {
    super()
  }

  static async SystemConfigurationList(req, res) {
    let objResponse;
    try {
        writeLog("--Start TCP SystemConfigurationList API----");
        objResponse = await ExcelUploadService.SystemConfigurationList();
        writeLog("TCP SystemConfigurationList Result : " + objResponse);
        return successResponse(req, res,"Succesfully", objResponse.dtList)
    } catch (error) {
      return errorResponse(req, res, error.message, null)
    }
  }
}

module.exports = ExcelUploadController
