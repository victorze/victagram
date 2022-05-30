const route = require('express').Router()
const { postController } = require('../controllers')
const { validateImage, validateId } = require('../handlers/validators')
const { auth } = require('../handlers')

route.post('/', auth, postController.store)
route.post('/upload', [auth, validateImage], postController.upload)
route.get('/:id', [auth, validateId], postController.show)
route.get('/user/:id', [auth, validateId], postController.userPosts)

module.exports = route
