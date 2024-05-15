const express = require('express')
const app = express()
const port = 3000
const db = require('./db/db.json')
const fs = require('fs')
const path = require('path')
const jsonFile = './db/db.json'
const { v4: uuidv4 } = require('uuid')

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
    console.log(jsonFile)
    let jsonBody = req.body
    jsonBody.id = uuidv4()
    const readFile = fs.readFile(jsonFile, 'utf8', (err, data) => {
        const parsedData = JSON.parse(data)
        parsedData.push(jsonBody)
        fs.writeFileSync(jsonFile, JSON.stringify(parsedData))
        console.log(data)
        console.error(error)

    })
    console.log(readFile)
    // fs.appendFileSync(jsonFile, JSON.stringify(jsonBody))
    res.send(jsonBody)
})
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})