const route = require('express').Router()
const { postController } = require('../controllers')
const { auth } = require('../handlers')

route.post('/', auth, postController.store)

module.exports = route
