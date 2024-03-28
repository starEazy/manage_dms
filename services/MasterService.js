'use strict'

const {writeLog} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')

class MasterService {
  static async GetCompanyList(){
    let objResponse={};
    try {
        let sQuery = "";
        sQuery = "SELECT DISTINCT 0 as companyid, '---All---' as companyname, '0' as companycode FROM company_mst UNION SELECT DISTINCT companyid,companyname,companycode FROM company_mst WHERE isdeactivated = FALSE order by companycode; ";
        let dtFilter = await postgreConnection.query(sQuery);
        writeLog("-----GetCompanyList Query-----  " + sQuery);
        if (dtFilter != null && dtFilter.length > 0) {
            objResponse.status = true;
            objResponse.statuscode = 200;
            objResponse.message = "Company List";
            objResponse.dtList = dtFilter;
        } else {
            objResponse.status = true;
            objResponse.statuscode = 201;
            objResponse.message = "No any company!!.";
            objResponse.dtList = dtFilter;
        }
    } catch (error) {
        writeLog("-----GetCompanyList Exception-----  " + error.message.ToString());
        objResponse.status = false;
        objResponse.statuscode = 417;
        objResponse.message = error.message;
        objResponse.dtList = null;
        throw error;
    }
    return objResponse;
  }
}

module.exports = MasterService
