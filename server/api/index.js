const router = require('express').Router()
module.exports = router

//Re-routes any api calls to /food to the food module, this is not necessary for this simpe project, but very helpful
//when building out an app that will have lots of api routes
router.use('/food', require('./food'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
