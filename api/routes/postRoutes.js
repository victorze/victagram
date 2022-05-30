const route = require('express').Router()
const { postController } = require('../controllers')
const { validateImage, validateId } = require('../controllers/validators')
const { auth } = require('../handlers')

route.post('/', auth, postController.store)
route.post('/upload', [auth, validateImage], postController.upload)
route.get('/:id', [auth, validateId], postController.show)

module.exports = route
