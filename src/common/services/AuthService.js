import FireBaseService from './FireBaseService'

exports.addUserByEmail = (email, password) => {
  return FireBaseService.createUser({
    email,
    password
  })
}
