const router = require('express').Router()

router.use('/api/users', require('./userRoutes'))
router.use('/api/posts', require('./postRoutes'))

module.exports = router
