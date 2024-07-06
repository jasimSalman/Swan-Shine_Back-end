const User = require('../models/User')
const Item = require('../models/Item')

const addToWishlist = async (req, res) => {
  const userId = req.params.userId
  const itemId = req.params.itemId

  try {
    const user = await User.findById(userId)
    const item = await Item.findById(itemId)

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    if (!item) {
      return res.status(404).send({ message: 'Item not found' })
    }

    if (user.fav_list.includes(itemId)) {
      return res.status(400).send({ message: 'Item already in wishlist' })
    }

    user.fav_list.push(itemId)
    await user.save()

    res.status(200).send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
} // http://localhost:3001/wishlist/:userId/:itemId

module.exports = {
  addToWishlist
}
