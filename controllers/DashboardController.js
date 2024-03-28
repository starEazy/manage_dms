'use strict'

const joiSchema = require('../apps/ValidateBody/schema')
const {
  commonApiResponse,
  errorResponse,
  successResponse,
  internalServerErrorResponse,
} = require('../apps/helpers/customResponseTemplate')
const DashboardService = require('../services/DashboardService')
const { writeLog } = require('../apps/helpers/utils')
const { Jwt } = require('../apps/JWT/jwt')
const { buildLoginToken } = require('../apps/JWT/encrypt-decrypt')
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class DashboardController extends DashboardService {
  constructor() {
    super()
  }

  static async AllChartList(req, res) {
    try {
        const dtChartList = await DashboardService.AllChartList();
        return successResponse(req, res,"Succesfully", objResponse.dtList)

        res.status(200).json({
            success: true,
            message: 'Dashboard request is successfully completed.',
            data: dtChartList,
            statusCode: 0
        });
    } catch (error) {
      return errorResponse(req, res, error.message, null)

        res.status(500).json({
            success: false,
            message: error.message,
            data: null,
            statusCode: 0
        });
    }
  }
}

module.exports = DashboardController
