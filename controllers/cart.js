const Cart = require('../models/Cart')
const User = require('../models/User')

// This function is responsible for adding new items to the cart and updating existing ones.
const addToCart = async (req, res) => {
  const userId = req.params.userId
  const { items } = req.body
  console.log(items)

  try {
    const foundedUser = await User.findById(userId)
    if (!foundedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array.' })
    }

    let cart = await Cart.findOne({
      user: userId,
      checked_out: false
    }).populate('items.item')

    if (cart) {
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item.item._id.toString() === newItem.item._id.toString()
        )
        if (existingItem) {
          existingItem.quantity = newItem.quantity
        } else {
          cart.items.push(newItem)
        }
      })
      cart.total_price = cart.items.reduce(
        (total, item) => total + item.item.price * item.quantity,
        0
      )
      cart.date = new Date()
    } else {
      cart = new Cart({
        user: userId,
        items,
        checked_out: false,
        date: new Date(),
        total_price: items.reduce(
          (total, item) => total + item.item.price * item.quantity,
          0
        )
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

//This function will delete a specific item from the currect cart.
const deleteFromCart = async (req, res) => {
  const userId = req.params.userId
  const itemId = req.params.itemId

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    let cart = await Cart.findOne({
      user: userId,
      checked_out: false
    }).populate('items.item')
    if (!cart) {
      return res.status(404).json({ error: 'No current cart found' })
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.item._id.toString() === itemId
    )
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in the cart' })
    }

    cart.items.splice(itemIndex, 1)
    await cart.save()

    res.json(cart)
  } catch (err) {
    console.error('Error deleting item from cart:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
} //http://localhost:3001/cart/:userId/:itemId

//This function will show all the items in the currect cart.
const show = async (req, res) => {
  const userId = req.params.userId
  try {
    const cart = await Cart.findOne({
      user: userId,
      checked_out: false
    }).populate('items.item')
    if (!cart) {
      return res.status(404).json({ error: 'No current cart found' })
    }

    res.json(cart.items)
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
} //http://localhost:3001/cart/:userId

//This function is responsible for the cart checkout.
const checkOut = async (req, res) => {
  const userId = req.params.userId

  try {
    const cart = await Cart.findOne({ user: userId, checked_out: false })
    if (!cart) {
      return res.status(404).json({ error: 'No current cart found' })
    }

    cart.checked_out = true
    await cart.save()

    res.json({ message: 'Checkout successful', cart })
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
} //http://localhost:3001/cart/checkout/:userId

// This function will show all the orders.
const index = async (req, res) => {
  const userId = req.params.userId
  try {
    const carts = await Cart.find({
      user: userId,
      checked_out: true
    }).populate('items.item')
    if (carts.length === 0) {
      return res.status(404).json({ error: 'No orders found' })
    }

    res.json(carts)
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
} //http://localhost:3001/cart/orders/:userId

module.exports = {
  addToCart,
  deleteFromCart,
  show,
  checkOut,
  index
}
