'use strict'

const joiSchema = require('../apps/ValidateBody/schema')
const {
  commonApiResponse,
  errorResponse,
  successResponse,
  internalServerErrorResponse,
} = require('../apps/helpers/customResponseTemplate')
const AuthService = require('../services/AuthService')
const { writeLog } = require('../apps/helpers/utils')
const { Jwt } = require('../apps/JWT/jwt')
const { buildLoginToken } = require('../apps/JWT/encrypt-decrypt')
const joiOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

class AuthController extends AuthService {
  constructor() {
    super()
  }

  static async SignIn(req, res) {
    writeLog('---Start Login Authentication----')
    try {
      const { UserName, Password } = req.body
      let dbMsgOrMessage = ''

      let dbName = await super.GetDatabaseName(dbMsgOrMessage)

      if (!dbName) {
        writeLog('---Failed Get DatabaseName ----')
        return errorResponse(req, res, dbMsgOrMessage)
      }

      writeLog('---Create Token----')
      writeLog('---dbMsgOrMessage---- ' + dbMsgOrMessage)

      const tokenDetails = {
        UserName,
        Password,
        DatabaseName: dbName,
      }


      writeLog('---Start Authentication----')
      let Message = ''
      let result = await super.Valid(tokenDetails, Message)

      if (result) {

        let token = await buildLoginToken(tokenDetails, true)
        res.setHeader('Token', token)
        return successResponse(req, res, 'Login Successfully', tokenDetails)

      } else {
        return res.status(407).json({
          status: false,
          statuscode: 407,
          message: Message,
        })
      }
      writeLog('---End Authentication----')
    } catch (error) {
      res.status(407).json({
        status: false,
        statuscode: 407,
        message: error.message,
      })
    }
  }
}

module.exports = AuthController
