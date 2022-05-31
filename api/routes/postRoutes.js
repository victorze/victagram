const route = require('express').Router()
const { postController, commentController } = require('../controllers')
const { validateImage, validateId } = require('../handlers/validators')
const { auth } = require('../handlers')

route.post('/', auth, postController.store)
route.post('/upload', [auth, validateImage], postController.upload)
route.get('/feed', auth, postController.feed)
route.get('/:id', [auth, validateId], postController.show)
route.get('/user/:id', [auth, validateId], postController.userPosts)
route.get('/', auth, postController.index)

route.post('/:id/comments', [auth, validateId], commentController.store)

module.exports = route
