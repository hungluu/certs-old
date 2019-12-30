const BaseErrorWithCode = require('./BaseErrorWithCode')

class ValidationError extends BaseErrorWithCode {
  constructor (errors) {
    super('Validation error', 400)

    this.errors = errors
  }
}

module.exports = ValidationError
