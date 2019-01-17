const router = require('express').Router()
const {Restaurant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('in user get api call')
  try {
    const response = await Restaurant.findAll({
      where: {
        cuisine: 'Thai'
      }
    })
    res.json(response)
  } catch (err) {
    console.log('get Food not working', err)
    next(err)
  }
})
