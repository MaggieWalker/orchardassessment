const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  camis: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
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
  }
})

module.exports = Restaurant
