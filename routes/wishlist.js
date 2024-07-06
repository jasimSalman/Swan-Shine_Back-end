const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlist')

router.post('/:userId/:itemId', wishlistController.addToWishlist)

module.exports = router
