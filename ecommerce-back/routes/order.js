const express = require('express')
const router = express.Router()
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authController')
const {
  userById,
  addOrderToUserHistory,
} = require('../controllers/userController')
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
} = require('../controllers/orderController')
const { decreaseQuantity } = require('../controllers/productController')

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
)
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders)
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
)
router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
)

router.param('userId', userById)
router.param('orderId', orderById)

module.exports = router
