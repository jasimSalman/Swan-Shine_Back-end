const User = require('../models/User')
const Item = require('../models/Item')

//This function allows the user to add an item to his wishlist
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
} // http://localhost:3001/wishlist/{userId}/{itemId}

//This function shows the User's wishlist
const showWishlist = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findById(userId).populate('fav_list')

    if (!user) {
      return res.status(404).send({ message: 'User not found !' })
    }
    res.status(200).send(user.fav_list)
  } catch (err) {
    res.status(500).send({ message: 'Internal Server error' })
  }
} // http://localhost:3001/wishlist/:userId

//This function will remove an item from the user's wishlist
const removeFromWishlist = async (req, res) => {
  const userId = req.params.userId
  const itemId = req.params.itemId

  // console.log(`Removing item ${itemId} from user ${userId}'s wishlist`)
  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    user.fav_list.pull(itemId)
    await user.save()

    res.status(200).send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Internal server error' })
  }
} // http://localhost:3001/wishlist/:userId/:itemId

module.exports = {
  addToWishlist,
  showWishlist,
  removeFromWishlist
}
