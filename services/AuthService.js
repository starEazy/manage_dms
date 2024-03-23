'use strict'

const {
  writeLog,
  DbNull,
  RemoveSpecialCharacter,
} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')
const {
  buildToken,
  stringDecrypt,
  encrypt,
  stringEncrypt,
} = require('../apps/JWT/encrypt-decrypt')
const { Jwt } = require('../apps/JWT/jwt')
const { response } = require('express')

class AuthService {
  static async GetDatabaseName() {
    let status = false
    let message = process.env.DB_DATABASE

    if (message) {
      writeLog('Start GetDatabaseName')

      writeLog('Get Database Name' + message)
      writeLog('End GetDatabaseName Status:' + status)
      return message // Assuming you want to return `true` here
    } else {
      let message = 'DataBase Server Not Working'
      writeLog('End GetDatabaseName Status:' + status)
      return message
    }
  }

  static async IsValid(Token, message) {
    try {
      const objToken = Decrypt(Token, true) // Assuming Decrypt function is defined somewhere
      let dtLog = new DataTable()

      if (objToken == null) return false

      dtLog = postgreConnection.ReturnDataTable(
        "select * from Sec_UserSessionLog where Token='" + Token + "'",
      )
      writeLog(
        "select * from Sec_UserSessionLog where Token='" + Token + "'",
      )
      writeLog('Returns 2' + dtLog.length.toString())

      if (dtLog == null || dtLog.length === 0) {
        message = 'Authentication failed due to invalid token.'
        return false
      } else {
        if (dtLog.length >= 1 && dtLog[0]['IsAsctive'] === false) {
          const errorResponse = postgreConnection.ReturnDataTable(
            'select * from Sec_UserSessionLog where UserID=' +
              parseInt(dtLog[0]['userid'], 10) +
              ' and s.IsAsctive == true',
          )
          if (errorResponse == null) {
            message = 'Someone has signed in at a different system.'
          } else if (errorResponse.length === 0) {
            message = 'Authentication failed due to expired token.'
          } else {
            message = 'Someone has signed in at a different system.'
          }
          return false
        }
        return true
      }
    } finally {
      writeLog('End Helper Library IsValid()')
    }
  }

  static async Valid(tokenDetail, Message) {
    writeLog('---Call Valid Function Start----')
    let status = false
    try {
      let sQuery = `SELECT userid, emailid, username, usertype 
      FROM tbl_usermaster 
      WHERE LOWER(emailid) = '${RemoveSpecialCharacter(
        tokenDetail.UserName.toLowerCase().trim(),
      )}' 
      AND password = '${encrypt(tokenDetail.Password)}' 
      AND isactive = true`

      
      let dt = await postgreConnection.query(sQuery)


      writeLog('Login Query ' + sQuery.toString())
      writeLog('Login dt count ' + dt.length)

      if (dt.length === 1) {
        tokenDetail.UserId = dt[0]['userid']
        tokenDetail.UserName = dt[0]['username']
        tokenDetail.usertype = dt[0]['usertype']
        // tokenDetail.UserId = DbNull(dt[0]['userid'], 'Integer32')
        // tokenDetail.UserName = DbNull(dt[0]['username'], 'Text')
        // tokenDetail.usertype = DbNull(dt[0]['usertype'], 'Integer32')
        Message = 'Login Successfully.'
        return (status = true)
      } else {
        Message = 'Please enter a correct user name/password.'
        return (status = false)
      }
      writeLog('---Call Valid Function End----')
    } catch (ex) {
      status = false
      Message = 'Database server not working.'
      writeLog('Exception In Valid Function' + ex.message)
      throw ex
    }
  }
}

module.exports = AuthService
