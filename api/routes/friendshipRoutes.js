const route = require('express').Router()
const { friendshipController } = require('../controllers')
const { auth } = require('../handlers')
const { validateId } = require('../handlers/validators')

route.post('/:id/follow', [auth, validateId], friendshipController.follow)

module.exports = route
