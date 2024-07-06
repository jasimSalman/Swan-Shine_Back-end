const Cart = require('../models/Cart')
const User = require('../models/User')

// This function is responsible for adding new items to the cart and updating existing ones.
const addToCart = async (req, res) => {
  const userId = req.params.userId
  const { items, date, total_price } = req.body

  try {
    const foundedUser = await User.findById(userId)
    if (!foundedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array.' })
    }

    let cart = await Cart.findOne({ user: userId, checked_out: false })

    if (cart) {
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item.item.toString() === newItem.item
        )
        if (existingItem) {
          existingItem.quantity += newItem.quantity
        } else {
          cart.items.push(newItem)
        }
      })
      cart.total_price += total_price
      cart.date = date || new Date()
    } else {
      cart = new Cart({
        user: userId,
        items,
        checked_out: false,
        date: date || new Date(),
        total_price
      })
    }

    const savedCart = await cart.save()

    if (!foundedUser.cart.includes(savedCart._id)) {
      foundedUser.cart.push(savedCart._id)
      await foundedUser.save()
    }

    res.json(savedCart)
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
} //http://localhost:3001/cart/:userId

module.exports = {
  addToCart
}
