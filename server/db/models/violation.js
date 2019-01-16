const Sequelize = require('sequelize')
const db = require('../db')

const Violation = db.define('violation', {
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: Sequelize.TEXT
  },
  criticalflag: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Critical', 'Not Critical', 'Not Applicable']]
    }
  }
})

module.exports = Violation
