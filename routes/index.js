import 'express-async-errors'
import { Router } from 'express'
import {
  userController,
  postController,
  commentController,
  likeController,
  friendshipController,
} from '../controllers/index.js'
import { validate as v, middleware } from '../utils/index.js'
const route = Router()

route.post('/users/signup', v.signup, userController.signup)
route.post('/users/login', v.login, userController.login)

// protected routes
route.use(middleware.auth)
route.get('/users/explore', userController.explore)
route.get('/users/:username', userController.show)
route.post('/users/upload', v.image, userController.upload)

route.post('/posts', v.post, postController.store)
route.post('/posts/upload', v.image, postController.upload)
route.get('/posts/feed', postController.feed)
route.get('/posts/:id', v.id, postController.show)
route.get('/posts/user/:id', v.id, postController.userPosts)
route.get('/posts', postController.index)
route.post('/posts/:id/comments', [v.id, v.comment], commentController.store)
route.post('/posts/:id/likes', v.id, likeController.like)
route.delete('/posts/:id/likes', v.id, likeController.unlike)

route.post('/friendships/:id/follow', v.id, friendshipController.follow)
route.delete('/friendships/:id/unfollow', v.id, friendshipController.unfollow)

export default route
