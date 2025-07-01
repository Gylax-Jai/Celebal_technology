const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World! By Jai ')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
