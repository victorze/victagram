const route = require('express').Router()
const { userController } = require('../controllers')
const { validateImage } = require('../controllers/validators/image')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/:username', userController.show)
route.post('/upload', validateImage, userController.upload)

module.exports = route
