const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const friendshipSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
    index: true,
  },
  follower: {
    type: ObjectId,
    required: true,
    index: true,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Friendship', friendshipSchema)
