import mongoose from 'mongoose'
import { env } from './index.js'

mongoose.set('strictQuery', false)
export const connect = () => {
  mongoose
    .connect(env.MONGODB_URI)
    .then(() => console.log('Connected successfully to mongodb server'))
    .catch((err) => {
      console.log(`mongoose error → ${err.message}`)
      process.exit(1)
    })
}
