const express = require('express')
const app = express()
const port = 3000
const db = require('./db/db.json')
const fs = require('fs')
const path = require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.send(db)
})

app.post('/api/notes', (req, res) => {
    let title = req.body.title
    let text = req.body.text
    console.log(title)
    res.send(title)
})
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})