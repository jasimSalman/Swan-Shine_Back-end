const router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.put('/reset-password', controller.UpdatePassword)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
router.get(
  '/shop/:shopId/items',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetShopItems
)
router.get(
  '/shop/:shopId/orders',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetShopOrders
)

module.exports = router
