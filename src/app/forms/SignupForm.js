const { isEmail, normalizeEmail, isEmpty } = require('validator')
const BaseForm = require('./BaseForm')

const SignupForm = new BaseForm({
  email: [
    {
      check: isEmpty,
      message: 'Please provide your email address'
    },
    {
      check: m => !isEmail(m),
      message: 'Please use valid email address'
    },
    // {
    //   only: errors => !errors.find(e => e.field === 'email'),
    //   async check (email) {
    //     const existingAccount = await Account.findOne({ email }).exec()

    //     if (existingAccount) {
    //       throw Error('Account with this email address exists')
    //     }
    //   }
    // },
    {
      sanitize: m => normalizeEmail(m, { gmail_remove_dots: false })
    }
  ]
})

module.exports = SignupForm
