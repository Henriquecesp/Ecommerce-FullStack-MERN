const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.signup = (request, response) => {
  const user = new User(request.body)
  user.save((err, user) => {
    if (err) {
      return response.status(400).json({
        err: errorHandler(err),
      })
    }

    user.salt = undefined
    user.hashed_password = undefined
    response.json({
      user,
    })
  })
}

exports.signin = (request, response) => {
  // find user based on email
  const { email, password } = request.body
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return response.status(400).json({
        error: 'User with that email does not exist. Please signup',
      })
    }
    // if found make sure email password match
    // create auth method in user model
    if (!user.authenticate(password)) {
      return response.status(401).json({
        error: 'Email and password dont match',
      })
    }
    //generate a signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    //persist the token as 't' in cookie with expiry date
    response.cookie('t', token, { expire: new Date() + 9999 })
    //return response with user and token to front
    const { _id, name, email, role } = user
    return response.json({ token, user: { _id, email, name, role } })
  })
}

exports.signout = (request, response) => {
  response.clearCookie('t')
  response.json({ message: 'Signout success' })
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
})

exports.isAuth = (request, response, next) => {
  let user =
    request.profile && request.auth && request.profile._id == request.auth._id
  if (!user) {
    return response.status(403).json({
      error: 'Access denied',
    })
  }
  next()
}

exports.isAdmin = (request, response, next) => {
  if (request.profile.role === 0) {
    return response.status(403).json({
      error: 'Access denied, admin only',
    })
  }
  next()
}
