const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  camis: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dba: {
    type: Sequelize.STRING,
    allowNull: false
  },
  boro: {
    type: Sequelize.STRING
  },
  building: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  zipcode: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  cuisine: {
    type: Sequelize.STRING
  },
  inspectiondate: {
    type: Sequelize.DATE
  },
  action: {
    type: Sequelize.STRING
  },
  violation: {
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
  inspectiontype: {
    type: Sequelize.STRING
  }
})

module.exports = Restaurant
