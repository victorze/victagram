const router = require('express').Router()

router.use('/api/users', require('./userRoutes'))

module.exports = router
