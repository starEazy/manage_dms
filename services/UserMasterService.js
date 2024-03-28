'use strict'

const {writeLog} = require('../apps/helpers/utils')
const postgreConnection = require('../apps/helpers/sequelizeHelper')

// const { response } = require('express')

class UserMasterService {
    static async getChannelPartnerList() {

        const objResponse = {
          status: false,
          statuscode: 417,
          message: '',
          dtList: null
        };
      
        try {
          const query = 'SELECT * FROM tbl_channelpartner WHERE isactive = true ORDER BY name';
          const result = await postgreConnection.query(query);
      
          if (result.length > 0) {
            objResponse.status = true;
            objResponse.statuscode = 200;
            objResponse.message = "Channel Partner List";
            objResponse.dtList = result;
          } else {
            objResponse.status = true;
            objResponse.statuscode = 201;
            objResponse.message = "No any company!!.";
            objResponse.dtList = result;
          }
        } catch (error) {
            writeLog("GetChannelPartnerList Exception:", error.message);
          objResponse.message = error.message;
          throw error;
        } finally {
          return objResponse;
        }
      }
}

module.exports = UserMasterService
