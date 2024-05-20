const express = require('express')
const app = express()
const port = process.env.PORT || 3000
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
    res.json(db)
})
app.post('/api/notes', (req, res) => {
    try {
        console.log(jsonFile)
        let jsonBody = req.body
        jsonBody.id = uuidv4()
        db.push(jsonBody)
        const readFile = fs.readFile(jsonFile, 'utf8', (err, data) => {
            const parsedData = JSON.parse(data)
            parsedData.push(jsonBody)
            fs.writeFileSync(jsonFile, JSON.stringify(parsedData))
            console.log(data)
            console.error(err)

        })
        console.log(readFile)
        // fs.appendFileSync(jsonFile, JSON.stringify(jsonBody))
        res.send(jsonBody)
    }
    catch (e) {
        console.error(e)
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const index = db.findIndex(note => note.id === id)
    db.splice(index, 1)
    fs.writeFileSync(jsonFile, JSON.stringify(db))
    res.send(db)
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})