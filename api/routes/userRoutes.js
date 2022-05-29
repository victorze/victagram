const route = require('express').Router()
const { userController } = require('../controllers')

route.post('/register', userController.register)

module.exports = route
