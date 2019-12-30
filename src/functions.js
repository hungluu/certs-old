const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const app = functions.https.onRequest(require('./app'))

module.exports = {
  app
}
