const route = require('express').Router()
const { userController } = require('../controllers')
const { validateImage, validateLogin, validateSignup, } = require('../handlers/validators')
const { auth } = require('../handlers')

route.post('/signup', validateSignup, userController.signup)
route.post('/login', validateLogin, userController.login)
route.get('/explore', auth, userController.explore)
route.get('/:username', userController.show)
route.post('/upload', [auth, validateImage], userController.upload)

module.exports = route
