const express = require('express')
const router = express.Router()

const { signup, signin, signout } = require('../controllers/authController')
const { userSignupValidator } = require('../validator')
// method
router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router
