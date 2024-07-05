const express = require('express')
const router = express.Router()
const shopCtrl = require('../controllers/shop')

router.get('/', shopCtrl.index)

module.exports = router
