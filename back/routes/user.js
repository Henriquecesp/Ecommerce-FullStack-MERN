const express = require('express')
const router = express.Router()

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authController')

const { userById, read, update } = require('../controllers/userController')

router.get(
  '/secret/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  (request, response) => {
    response.json({
      user: request.profile,
    })
  }
)

router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)

// method
router.param('userId', userById)

module.exports = router
