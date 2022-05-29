require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const { notFound, productionErrors, logger } = require('./handlers')

const app = express()
app.use(express.json())
app.use(morgan('short', {
  stream: {
    write: message => logger.info(message.trim())
  }
}))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected successfully to mongodb server'))
  .catch((err) => {
    console.error(`mongoose error → ${err.message}`)
    process.exit(1)
  })

app.get('/', (req, res) => {
  console.log('home')
  res.end('home')
})

app.use(require('./routes'))

app.use(notFound)
app.use(productionErrors)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`)
})
