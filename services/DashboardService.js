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

class DashboardService {
  static async AllChartList(){
    let dt;
    try {
        let sqlquery = "SELECT qryid FROM dashboardqueries WHERE isvisible=true order by dashboardorder;";
        dt = await DashboardService.ExecuteScript_GetDT(sqlquery);
        console.log(dt,'dt.......');
    } catch (error) {
      throw error;
    }
    return dt;
  }

  static async ExecuteScript_GetDT(PStrQuery){

  }
}

module.exports = DashboardService
