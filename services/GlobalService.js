'use strict'

const postgreConnection = require('../apps/helpers/sequelizeHelper')
const { writeLog } = require('../apps/helpers/utils')
// const { response } = require('express')

class GlobalService {
    static async getCountryList() {
        const objResultSet = {
          status: false,
          message: '',
          dtCountryList: null,
          dtStateList: null,
          dtCityList: null
        };
      
        try {
          const countryQuery = 'SELECT * FROM countrymaster WHERE isactive = true';
          const stateQuery = 'SELECT * FROM statemaster WHERE isactive = true';
          const cityQuery = 'SELECT * FROM citymaster WHERE isactive = true';
      
          const countryResult = await postgreConnection.query(countryQuery);          
          writeLog("-----countrymaster Query-----  " + stateQuery);
          const stateResult = await postgreConnection.query(stateQuery);
          writeLog("-----statemaster Query-----  " + stateQuery);
          const cityResult = await postgreConnection.query(cityQuery);
          writeLog("-----citymaster Query-----  " + cityQuery);
      
          objResultSet.status = true;
          objResultSet.message = "All Lists";
          objResultSet.dtCountryList = countryResult;
          objResultSet.dtStateList = stateResult;
          objResultSet.dtCityList = cityResult;
          // console.log(objResultSet)
        } catch (error) {
          writeLog("GetCountryList Exception:", error.message);
          objResultSet.message = error.message;
          console.log(objResultSet)
          throw error;
        } finally {
          return objResultSet;
        }
      }
}

module.exports = GlobalService
