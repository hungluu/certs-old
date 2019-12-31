const { join: joinPaths } = require('path')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const handleErrors = require('./middlewares/handleErrors')
const AuthController = require('./controllers/AuthController')

require('dotenv').config({
  path: joinPaths(__dirname, '..', '.env')
})

const app = express()

app.set('host', '0.0.0.0')
app.set('port', process.env.APP_PORT || 3000)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Add logger
// Add security
// Robots.txt

app.get('/', (_, res) => {
  res.send('Hello')
})
app.post('/signup', AuthController.postSignUpByEmail)

app.use(handleErrors)
app.use('*', (_, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found'
  })
})

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', '✓', app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
