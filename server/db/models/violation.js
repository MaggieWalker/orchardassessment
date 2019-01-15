const Sequelize = require('sequelize')
const db = require('../db')

const Violation = db.define('violation', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  criticalflag: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['Critical', 'Not Critical', 'Not Applicable']]
    }
  }
})

module.exports = Violation
