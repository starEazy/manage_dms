'use strict'

const {writeLog} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')

class MasterService {
    static async getCompanyDetails(companyId) {
        const objResponse = {
          status: false,
          statuscode: 417,
          message: '',
          dtList: null
        };
      
        try {
          const query = `SELECT com.countryid, sm.stateid, cm.* 
                        FROM company_mst cm 
                        LEFT JOIN citymaster ctm ON ctm.cityid = cm.city 
                        LEFT JOIN statemaster sm ON sm.stateid = ctm.stateid 
                        LEFT JOIN countrymaster com ON com.countryid = sm.countryid 
                        WHERE isdeactivated = FALSE AND cm.companyid = $1`;

          const values = [companyId];
          
      
          const result = await postgreConnection.selectWithValues(query,values);
      
          if (result.length > 0) {
            objResponse.status = true;
            objResponse.statuscode = 200;
            objResponse.message = "Company List";
            objResponse.dtList = result;
          } else {
            objResponse.status = true;
            objResponse.statuscode = 201;
            objResponse.message = "No any company!!.";
            objResponse.dtList = result;
          }
        } catch (error) {
            writeLog("-----GetCompanyDetails Exception-----", error.message);
          objResponse.message = error.message;
          throw error;
        } finally {
          return objResponse;
        }
      }
}

module.exports = MasterService
