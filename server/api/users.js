const router = require('express').Router()
const {Restaurant} = require('../db/models')
const Inspection = require('../db/models/inspection')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  console.log('in user get api call')
  try {
    const response = await Restaurant.findAll({
      where: {
        cuisine: 'Thai'
      },
      include: [
        {
          model: Inspection,
          where: {
            inspectiondate: {
              [Op.gt]: '2019-01-01T05:00:00.000Z'
            },
            grade: {
              [Op.in]: ['A', 'B']
            }
          }
        }
      ]
    })
    res.json(response)
  } catch (err) {
    console.log('get Food not working', err)
    next(err)
  }
})
