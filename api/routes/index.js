const router = require('express').Router()

router.use('/api/users', require('./userRoutes'))
router.use('/api/posts', require('./postRoutes'))
router.use('/api/friendships', require('./friendshipRoutes'))

module.exports = router
