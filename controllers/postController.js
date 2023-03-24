import { Post, Friendship } from '../models/index.js'
import { logger } from '../utils/index.js'
import { storage } from '../utils/index.js'

export const store = async (req, res) => {
  const { imageUrl, caption } = req.body
  const post = await Post.create({ imageUrl, caption, author: req.user._id })
  logger.info('Nuevo post %s', post)
  res.status(201).json(post)
}

export const upload = async (req, res) => {
  const imageUrl = await storage.saveImage(req.body, req.fileName)
  logger.info(
    `El usuario '${req.user.username}' ha subido una imagen de post ${imageUrl}`
  )
  res.json({ url: imageUrl })
}

export const feed = async (req, res) => {
  const searchBefore = req.query.date || new Date()
  const following = await Friendship.find({ follower: req.user.id })
  const followingIds = following.map((friend) => friend.user)
  followingIds.push(req.user.id)

  const posts = await Post.find({
    author: followingIds,
    createdAt: { $lt: searchBefore },
  })
    .limit(3)
    .sort('-createdAt')

  posts.forEach((post) => (post.hasLiked = post.likes.includes(req.user.id)))

  res.json(posts)
}

export const show = async (req, res) => {
  const post = await Post.findById(req.params.id)
  post.hasLiked = post.likes.includes(req.user.id)
  res.json(post)
}

export const userPosts = async (req, res) => {
  const posts = await Post.find({ author: req.params.id })
    .limit(24)
    .sort('-createdAt')
  res.json(posts)
}

export const index = async (req, res) => {
  const posts = await Post.find().limit(24).sort('-createdAt')
  res.json(posts)
}
