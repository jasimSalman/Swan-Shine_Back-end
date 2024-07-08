const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')
const middleware = require('../middleware')

router.get(
  '/orders/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  cartCtrl.index
)

router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  cartCtrl.show
)

router.put(
  '/checkout/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  cartCtrl.checkOut
)

router.post(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  cartCtrl.addToCart
)

router.delete(
  '/:userId/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  cartCtrl.deleteFromCart
)

module.exports = router
