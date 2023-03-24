import { Router } from 'express'
import { friendshipController } from '../controllers/index.js'
import { auth } from '../utils/middleware.js'
import { id } from '../utils/validators/index.js'
const route = Router()

route.post('/:id/follow', [auth, id], friendshipController.follow)
route.delete('/:id/unfollow', [auth, id], friendshipController.unfollow)

export default route
