const ValidationError = require('../errors/ValidationError')

const handleErrorsMiddleware = (err, _, res, __) => {
  const code = err.code || res.statusCode || 500
  const message = err.message || 'Internal Server Error'

  if (err instanceof ValidationError) {
    res.send({
      code,
      message,
      errors: err.errors
    })
  } else {
    res.send({
      code,
      message
    })
  }
}

module.exports = handleErrorsMiddleware
