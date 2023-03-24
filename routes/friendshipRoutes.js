const route = require('express').Router()
const { friendshipController } = require('../controllers')
const { auth } = require('../handlers')
const { id } = require('../handlers/validators')

route.post('/:id/follow', [auth, id], friendshipController.follow)
route.delete('/:id/unfollow', [auth, id], friendshipController.unfollow)

module.exports = route
