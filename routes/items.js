const express = require('express')
const router = express.Router()
const itemsCtrl = require('../controllers/items')

router.get('/:categoryId', itemsCtrl.index)

// router.get('/:userId', itemsCtrl.show)

module.exports = router
