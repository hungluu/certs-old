const { map, chain, forEach, filter } = require('lodash')
const ValidationError = require('../../common/errors/ValidationError')

class BaseForm {
  constructor (fields) {
    this.fields = fields
  }

  async validate (form) {
    const validationResult = await this.getValidationResult(form)

    if (!validationResult.success) {
      throw new ValidationError(validationResult.errors)
    }
  }

  async getValidationResult (form) {
    const errors = []

    await Promise.all(map(this.fields, (rules, field) => {
      return Promise.all(map(rules, async ({ check, message, only }) => {
        try {
          if (only && !only(errors, form)) {
            return
          }

          if (check && await check(form[field], form)) {
            errors.push({
              field,
              message: message
            })
          }
        } catch (err) {
          errors.push({
            field,
            message: message || err.message
          })
        }
      }))
    }))

    if (!errors.length) {
      return {
        success: true
      }
    } else {
      return {
        success: false,
        errors: chain(errors).groupBy('field').mapValues(v => map(v, 'message')).value()
      }
    }
  }

  sanitize (form) {
    const results = {}

    forEach(this.fields, (rules, field) => {
      const sanitizers = filter(rules, r => r.sanitize)
      let sanitizedValue = form[field]

      forEach(sanitizers, sanitizer => {
        sanitizedValue = sanitizer.sanitize(sanitizedValue, form)
      })

      results[field] = sanitizedValue
    })

    return results
  }
}

module.exports = BaseForm
