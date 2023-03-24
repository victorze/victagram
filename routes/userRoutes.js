import { Router } from 'express'
import { userController } from '../controllers/index.js'
import {
  validateImage,
  validateLogin,
  validateSignup,
} from '../utils/validators/index.js'
import { auth } from '../utils/middleware.js'
const route = Router()

route.post('/signup', validateSignup, userController.signup)
route.post('/login', validateLogin, userController.login)
route.get('/whoami', auth, userController.whoami)
route.get('/explore', auth, userController.explore)
route.get('/:username', auth, userController.show)
route.post('/upload', [auth, validateImage], userController.upload)

export default route
