'use strict'

const {
  writeLog,
  DbNull,
  RemoveSpecialCharacter,
} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')
const {
  errorResponse,
  successResponse,
} = require('../apps/helpers/customResponseTemplate')

class GlobalService {

  // --------------------------GetUserList -----------------------------------//
  static async getUserList() {
    const objResultSet = {
      status: false,
      statuscode: 417,
      message: '',
      dtList: null,
    }
    try {
      let sQuery = `SELECT DISTINCT * FROM tbl_usermaster WHERE usertype <> '10' AND isactive = TRUE`
      writeLog('-----GetUserList Query-----', sQuery)

      const dtUserList = await postgreConnection.query(sQuery) // Assuming you have a function to execute queries
        objResultSet.statuscode = 200,
        objResultSet.status = true,
        objResultSet.message = 'All User List',
        objResultSet.dtList = dtUserList
    } catch (error) {
      writeLog('-----GetUserList Exception-----', error.message)
      objResultSet.status = false
      objResultSet.message = error.message
      throw error
    } finally {
      return objResultSet
    }
  }


    // --------------------------GetUserRoleList -----------------------------------//


  static async getUserRoleList(FormId, tokenDetails) {
    const objResultSet = {
      status: false,
      statuscode: 417,
      message: '',
      dtList: null,
    }

    try {
      const sQuery = `
          SELECT roleid,
                 COALESCE(mnucreate, FALSE) AS addnew,
                 COALESCE(mnuedit, FALSE) AS edit,
                 COALESCE(mnuview, FALSE) AS view,
                 COALESCE(mnuprint, FALSE) AS print,
                 COALESCE(mnuexporttoexcel, FALSE) AS exporttoexcel
          FROM tbl_secuserrole
          WHERE userid = ${tokenDetails.UserId} AND menuid = ${FormId};
        `

      writeLog('-----GetUserRoleList Query-----  ' + sQuery)

      const dtAllModuleList = await postgreConnection.query(sQuery)
        objResultSet.statuscode = 200,
        objResultSet.status = true,
        objResultSet.message = 'All User Role List',
        objResultSet.dtList = dtAllModuleList
    } catch (error) {
      writeLog('GenerateNewCode Exception:', error.message)
      objResultSet.status = false
      objResultSet.message = error.message
      throw error
    } finally {
      return objResultSet
    }
  }


    // --------------------------GetGenrateNewCode--------------------------------------//


  static async generateNewCode(id) {
    const objResultSet = {
      status: false,
      message: '',
      dtCountryList: null,
      dtStateList: null,
      dtCityList: null,
    }

    try {
      let sQuery = `SELECT * FROM tbl_generate_newcode WHERE isactive = true AND id = ${id}`
      writeLog('-----Get tbl_generate_newcode Data Query-----  ' + sQuery)

      let dt = await postgreConnection.query(sQuery)
      if (dt.length > 0) {
        sQuery = ` SELECT * FROM generate_code('${dt[0].columnname}', '${dt[0].startkey}', '${dt[0].tablename}')`
        let dtGenerateCode = await postgreConnection.query(sQuery)
        writeLog('-----GenerateNewCode Query-----  ' + sQuery)

        if (
          dtGenerateCode.length > 0 &&
          dtGenerateCode[0].generate_code !== null &&
          dtGenerateCode[0].generate_code !== ''
        ) {
          objResultSet.status = true
          objResultSet.message = dtGenerateCode[0].generate_code
        } else {
          objResultSet.status = true
          objResultSet.message = dt[0].startkey + dt[0].startnumber
        }
      } else {
        objResultSet.status = false;
      }
    } catch (error) {
      writeLog('GenerateNewCode Exception:', error.message)
      objResultSet.status = false
      objResultSet.message = error.message
      throw error
    } finally {
      return objResultSet
    }
  }
}

module.exports = GlobalService
