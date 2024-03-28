const GlobalService = require('../services/GlobalService')
const { writeLog } = require('../apps/helpers/utils')
const {
  errorResponse,
  successResponse,
} = require('../apps/helpers/customResponseTemplate')

const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class GlobalController extends GlobalService {
  constructor() {
    super()
  }

  // --------------------------GetUserList -----------------------------------//

  static async getUserList(req, res) {
    try {
      writeLog('--Start GetUserList API----')

      // const global = new Global();
      const objResponse = await GlobalService.getUserList()

      writeLog('GetUserList Result : ', objResponse)
      return successResponse(req, res, 'Successfully', objResponse)
    } catch (error) {
      writeLog('Error in getUserList:', error)
      return errorResponse(req, res, error.message, objResponse)
    }
  }

  // --------------------------GetUserRoleList -----------------------------------//

  static async getUserRoleList(req, res) {
    try {
      //  const formId = req.params;
      //   console.log(formId);
      const tokenDetails = req.user
      console.log('1111111111', req.user)
      const formId = parseInt(req.params.FormId)
      console.log(formId)

      // Call the service method to get user role list
      const objResponse = await GlobalService.getUserRoleList(
        formId,
        tokenDetails,
      )

      // Logging
      writeLog('GetUserRoleList Result : ', objResponse)

      // Returning response
      return successResponse(req, res, 'Successfully', objResponse)
    } catch (error) {
      // Logging error
      console.log(error)
      writeLog('GetUserRoleList Error: ', error)

      // Returning error response
      return errorResponse(req, res, error.message, objResponse)
    }
  }

  // --------------------------GetGenrateNewCode--------------------------------------//

  static async generateNewCode(req, res) {
    try {
      const tokenDetails = req.user
      console.log('1111111111', req.user)

      const id = parseInt(req.params.id)
      console.log(id)
      writeLog('--Start GenerateNewCode API----')

      const result = await GlobalService.generateNewCode(id)

      writeLog('GenerateNewCode Result : ' + result)

      return successResponse(req, res, 'Successfully', result.message)
    } catch (error) {
      console.log(error)
      return errorResponse(req, res, 'Error occurred', error.message)
    }
  }
}

module.exports = GlobalController
