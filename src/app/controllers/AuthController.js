const SignupForm = require('../forms/SignupForm')

exports.postLogin = () => {

}

exports.postSignUpByEmail = async (req, res, next) => {
  try {
    await SignupForm.validate(req)

    res.send({
      message: 'OK'
    })
  } catch (err) {
    next(err)
  }
}
