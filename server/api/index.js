const router = require('express').Router()
const Restaurant = require('../db/models/restaurant')
module.exports = router

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.get('/', async (req, res, next) => {
  console.log('in get api call')
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
