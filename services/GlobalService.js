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
  static async getUserList() {
    try {
      let sQuery = `
                SELECT DISTINCT * FROM tbl_usermaster WHERE usertype <> '10' AND isactive = TRUE
            `
      writeLog('-----GetUserList Query-----', sQuery)

      const dtUserList = await postgreConnection.query(sQuery) // Assuming you have a function to execute queries
      console.log('dtUserList', dtUserList)
      const objResultSet = {
        statuscode: 200,
        status: true,
        message: 'All User List',
        dtList: dtUserList,
      }

      return objResultSet
    } catch (error) {
      writeLog('-----GetUserList Exception-----', error.message)
      throw error
    }
  }

  static async getUserRoleList(FormId, tokenDetails) {
    try {
      let objResultSet = {}
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
      console.log('dtAllModuleList', dtAllModuleList)
      objResultSet = {
        statuscode: 200,
        status: true,
        message: 'All User Role List',
        dtList: dtAllModuleList,
      }

      return objResultSet
    } catch (error) {
      console.error('Error executing query:', error)

      throw new Error(error.message)
    }
  }

  static async generateNewCode(id) {
    let objResultSet = { status: false, message: '' }

    try {
      let sQuery = `
      SELECT * FROM tbl_generate_newcode 
      WHERE isactive = true AND id = ${id}
    `
      let dt = await postgreConnection.query(sQuery)
      console.log('2222222222', dt)
      //    const row = dt.rows[0]
      console.log(dt[0].columnname)

      if (dt.length > 0) {
        console.log('Result or rows is empty or undefined')
        sQuery = `
        SELECT * FROM generate_code('${dt[0].columnname}', '${dt[0].startkey}', '${dt[0].tablename}')
      `
        console.log(sQuery)
        let dtGenerateCode = await postgreConnection.query(sQuery)
        console.log('dtGenerateCode', dtGenerateCode)
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
        console.log(error)
      }
    } catch (error) {
      console.error('GenerateNewCode Exception:', error.message)
      objResultSet.status = false
      objResultSet.message = error.message
      throw error
    }
    return objResultSet
  }
}

module.exports = GlobalService
