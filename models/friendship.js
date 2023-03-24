import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const friendshipSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      index: true,
    },
    follower: {
      type: ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Friendship = mongoose.model('Friendship', friendshipSchema)
