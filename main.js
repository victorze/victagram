import { env, mongoose } from './config/index.js'
import app from './app.js'

mongoose.connect()

app.listen(env.PORT, () => {
  console.log(`Starting development server: ${env.APP_URL}:${env.PORT}`)
})
