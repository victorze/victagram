const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'usuario',
  },
  mensaje: {
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
}, {
  timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)
