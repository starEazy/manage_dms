'use strict'
const { log } = require('winston')
const db = require('../../database/models/index.js')
const sequelize = require('sequelize')
const postgreConnection = {
  query: async (query, types) => {
    if (types) {
      let result
      switch (types) {
        case 'select':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
          })
          return result
        case 'insert':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.INSERT,
          })
          return result
        case 'update':
          result = await db.sequelize.query(query, {
            type: sequelize.QueryTypes.UPDATE,
          })
          return result
      }
    } else {
      let result = await db.sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      })
      return result
    }
  },
  getSingleData: async query => {
    let result = await db.sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    return result[0]
  },
  updateWithValues: async (query, values) => {
    let result = await db.sequelize.query(query, {
      bind: values,
      type: sequelize.QueryTypes.INSERT,
    })
    return result
  },
  selectWithValues: async (query, values) => {
    let result = await db.sequelize.query(query, {
      bind: values,
      type: sequelize.QueryTypes.SELECT,
    })
    return result
  },

   
}

module.exports = postgreConnection
