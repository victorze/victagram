const route = require('express').Router()
const { userController } = require('../controllers')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/:username', userController.show)

module.exports = route
