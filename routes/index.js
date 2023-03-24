import 'express-async-errors'
import { Router } from 'express'
import userRoutes from './userRoutes.js'
import postRoutes from './postRoutes.js'
import friendshipRoutes from './friendshipRoutes.js'
const router = Router()

router.use('/api/users', userRoutes)
router.use('/api/posts', postRoutes)
router.use('/api/friendships', friendshipRoutes)

export default router
