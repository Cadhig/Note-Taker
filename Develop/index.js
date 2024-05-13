const express = require('express')
const app = express()
const port = 3000
const db = require('./db/db.json')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/notes', (req, res) => {
    res.send(db)
})

app.listen(port, () => {
    console.log(`Back end listening on ${port}`)
})