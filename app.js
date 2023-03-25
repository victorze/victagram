import path from 'path'
import express from 'express'
import routes from './routes/index.js'
import { env } from './config/index.js'
import { middleware } from './utils/index.js'

const app = express()
app.use(express.json())
app.use(express.raw({ type: 'image/*', limit: '5mb' }))
app.use(express.static(path.join(env.BASE_DIR, 'public')))
app.use(express.static(path.join(env.BASE_DIR, 'frontend', 'dist')))

app.use(middleware.requestLogger)

app.use('/api', routes)
app.get(/[a-z0-9]*/, (_req, res) => {
  res.sendFile(path.join(env.BASE_DIR, 'frontend', 'dist', 'index.html'))
})

app.use(middleware.notFound)
app.use(middleware.productionErrors)

export default app
