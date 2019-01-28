const Sequelize = require('sequelize')
const db = require('../db')

const Inspection = db.define('inspection', {
  inspectionId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  inspectiondate: {
    type: Sequelize.DATE
  },
  action: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.STRING
  },
  grade: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['A', 'B', 'C', 'Z', 'P', 'N']]
    }
  },
  recorddate: {
    type: Sequelize.DATE
  },
  violationCode: {
    type: Sequelize.STRING
  },
  inspectiontype: {
    type: Sequelize.STRING
  }
})

module.exports = Inspection
