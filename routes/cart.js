const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')

router.get('/:userId', cartCtrl.index)

router.post('/:userId', cartCtrl.addToCart)

router.delete('/:userId/:itemId', cartCtrl.deleteFromCart)

module.exports = router
