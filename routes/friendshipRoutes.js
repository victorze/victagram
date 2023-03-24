import { Router } from 'express'
import { friendshipController } from '../controllers/index.js'
import { auth } from '../handlers/index.js'
import { id } from '../handlers/validators/index.js'
const route = Router()

route.post('/:id/follow', [auth, id], friendshipController.follow)
route.delete('/:id/unfollow', [auth, id], friendshipController.unfollow)

export default route
