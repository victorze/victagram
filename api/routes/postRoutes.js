const route = require('express').Router()
const { postController } = require('../controllers')
const { validateImage } = require('../controllers/validators/image')
const { auth } = require('../handlers')

route.post('/', auth, postController.store)
route.post('/upload', [auth, validateImage], postController.upload)

module.exports = route
