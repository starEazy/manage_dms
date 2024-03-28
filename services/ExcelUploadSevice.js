'use strict'

const {writeLog} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')

class ExcelUploadService {
  static async SystemConfigurationList(){
   let objResultSet={};
   let sQuery;
   let dt;
   try {
    sQuery="SELECT id as configuration_id, systemconfiguration as configuration_name FROM tbl_systemconfiguration WHERE id in (1,2) AND isactive=true order by 1 ";
    writeLog("-----TCP SystemConfigurationList Query-----  " + sQuery);

    dt = await postgreConnection.query(sQuery);

    objResultSet.status = true;
    objResultSet.message = "All List";
    objResultSet.dtList = dt;
   } catch (error) {
    writeLog("-----TCP SystemConfigurationList Exception-----  " + error.message);
    objResultSet.status = false;
    objResultSet.message = error.message;
    throw error;
   }
   return objResultSet;
  }
}

module.exports = ExcelUploadService
