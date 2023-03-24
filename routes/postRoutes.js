import { Router } from 'express'
import {
  postController,
  commentController,
  likeController,
} from '../controllers/index.js'
import {
  validateImage,
  id,
  validatePost,
  validateComment,
} from '../utils/validators/index.js'
import { auth } from '../utils/middleware.js'
const route = Router()

route.post('/', [auth, validatePost], postController.store)
route.post('/upload', [auth, validateImage], postController.upload)
route.get('/feed', auth, postController.feed)
route.get('/:id', [auth, id], postController.show)
route.get('/user/:id', [auth, id], postController.userPosts)
route.get('/', auth, postController.index)

route.post(
  '/:id/comments',
  [auth, id, validateComment],
  commentController.store
)

route.post('/:id/likes', [auth, id], likeController.like)
route.delete('/:id/likes', [auth, id], likeController.unlike)

export default route
