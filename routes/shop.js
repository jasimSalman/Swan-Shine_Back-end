const express = require('express')
const router = express.Router()
const shopCtrl = require('../controllers/shop')
const middleware = require('../middleware')

router.get('/', shopCtrl.index)
router.get(
  '/:shopId/items',
  middleware.stripToken,
  middleware.verifyToken,
  shopCtrl.getItemsByShop
)

router.post(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  shopCtrl.createShop
)

module.exports = router
