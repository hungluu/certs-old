const { join: joinPaths } = require('path')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const handleErrors = require('./middlewares/handleErrors')
const AuthController = require('./controllers/AuthController')

require('dotenv').config({
  path: joinPaths(__dirname, '.env')
})

const app = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Add logger
// Add security
// Robots.txt

app.get('/', (_, res) => res.send('Hello'))
app.post('/signup', AuthController.postSignUpByEmail)

app.use(handleErrors)
app.use('*', (_, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found'
  })
})

module.exports = app
