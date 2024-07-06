const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')

router.get('/orders/:userId', cartCtrl.index)

router.get('/:userId', cartCtrl.show)

router.post('/checkout/:userId', cartCtrl.checkOut)

router.post('/:userId', cartCtrl.addToCart)

router.delete('/:userId/:itemId', cartCtrl.deleteFromCart)

module.exports = router
