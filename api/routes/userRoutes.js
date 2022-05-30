const route = require('express').Router()
const { userController } = require('../controllers')
const { validateImage } = require('../handlers/validators')
const { auth } = require('../handlers')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/:username', userController.show)
route.post('/upload', [auth, validateImage], userController.upload)

module.exports = route
