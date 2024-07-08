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

router.delete(
  '/admin/delete-shop-owner/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteShopOwner
)

router.post(
  '/admin/accept-shop-owner/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.AcceptShopOwner
)
router.post(
  '/admin/reject-shop-owner/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.RejectShopOwner
)

router.get(
  '/admin/shop-owners',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllShopOwners
)

module.exports = router
