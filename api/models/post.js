const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'usuario',
  },
  message: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'User',
    index: true,
  },
  caption: {
    type: String,
    maxlength: 200,
  },
  comments: [commentSchema],
  likes: [ObjectId],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

postSchema.virtual('commentCount').get(function () {
  return this.comments.length
})

postSchema.virtual('likeCount').get(function () {
  return this.likes.length
})

module.exports = mongoose.model('Post', postSchema)
