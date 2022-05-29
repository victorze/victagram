const route = require('express').Router()
const { userController } = require('../controllers')

route.post('/register', userController.register)
route.post('/login', userController.login)

module.exports = route
