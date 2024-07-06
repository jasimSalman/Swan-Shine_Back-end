const express = require('express')
const router = express.Router()
const cartCtrl = require('../controllers/cart')

router.post('/:userId', cartCtrl.addToCart)

module.exports = router
