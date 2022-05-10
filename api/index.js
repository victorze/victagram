const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('hello world')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Starting development server at http://localhost:${PORT}`)
})
