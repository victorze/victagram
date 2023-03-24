import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const postSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    author: {
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
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

function autoPopulate(next) {
  this.populate('author', '-hash -salt')
  this.populate([
    {
      path: 'comments',
      populate: { path: 'author' },
    },
  ])
  next()
}

postSchema.pre('find', autoPopulate)
postSchema.pre('findOne', autoPopulate)

postSchema.virtual('commentCount').get(function () {
  return this.comments.length
})

postSchema.virtual('likeCount').get(function () {
  return this.likes.length
})

postSchema
  .virtual('hasLiked')
  .get(function () {
    return this._hasLiked || false
  })
  .set(function (value) {
    this._hasLiked = value
  })

export const Post = mongoose.model('Post', postSchema)
