const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlist')
const middleware = require('../middleware')

router.post(
  '/:userId/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  wishlistController.addToWishlist
)
router.get(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  wishlistController.showWishlist
)
router.delete(
  '/:userId/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  wishlistController.removeFromWishlist
)

module.exports = router
