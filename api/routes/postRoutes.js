const route = require('express').Router()
const { postController, commentController, likeController } = require('../controllers')
const { validateImage, id } = require('../handlers/validators')
const { auth } = require('../handlers')

route.post('/', auth, postController.store)
route.post('/upload', [auth, validateImage], postController.upload)
route.get('/feed', auth, postController.feed)
route.get('/:id', [auth, id], postController.show)
route.get('/user/:id', [auth, id], postController.userPosts)
route.get('/', auth, postController.index)

route.post('/:id/comments', [auth, id], commentController.store)

route.post('/:id/likes', [auth, id], likeController.like)

module.exports = route
