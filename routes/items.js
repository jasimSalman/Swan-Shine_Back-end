const express = require('express')
const router = express.Router()
const itemsCtrl = require('../controllers/items')

router.get('/:categoryId', itemsCtrl.index)

router.put('/:itemId', itemsCtrl.update)

router.post('/:userId', itemsCtrl.addItem)

router.delete('/:itemId', itemsCtrl.deleteItem)

// router.get('/:userId', itemsCtrl.show)

module.exports = router
