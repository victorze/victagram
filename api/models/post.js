const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

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
}, {
  timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)
