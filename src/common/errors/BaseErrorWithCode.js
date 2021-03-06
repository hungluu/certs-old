class BaseErrorWithCode extends Error {
  constructor (message, code) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.code = code
  }
}

module.exports = BaseErrorWithCode
