const admin = require('firebase-admin')
const serviceAccount = require('../config/credentials/firebase-service-acount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.TEKU_CERTS_DB_URL
})

module.exports = admin.auth()
