const express = require('express')

const app = express()

app.get('/', (_, res) => res.send('Hello'))
app.get('/test', (_, res) => res.send('Test'))

module.exports = app
