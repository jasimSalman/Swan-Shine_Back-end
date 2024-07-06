const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlist')

router.post('/:userId/:itemId', wishlistController.addToWishlist)
router.get('/:userId', wishlistController.showWishlist)
router.delete('/:userId/:itemId', wishlistController.removeFromWishlist)

module.exports = router
