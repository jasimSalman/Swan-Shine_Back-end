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

module.exports = router
