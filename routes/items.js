const express = require('express')
const router = express.Router()
const itemsCtrl = require('../controllers/items')
const middleware = require('../middleware')

router.get('/:itemId/reviews', itemsCtrl.showReview)

router.get('/show/:itemId', itemsCtrl.show)

router.get('/:categoryId', itemsCtrl.index)

router.put(
  '/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  itemsCtrl.update
)

router.post(
  '/:itemId/reviews/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  itemsCtrl.addReview
)

router.post(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  itemsCtrl.addItem
)

router.delete(
  '/reviews/:reviewId',
  middleware.stripToken,
  middleware.verifyToken,
  itemsCtrl.deleteReview
)

router.delete(
  '/:itemId',
  middleware.stripToken,
  middleware.verifyToken,
  itemsCtrl.deleteItem
)

module.exports = router
