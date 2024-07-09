const Cart = require('../models/Cart')
const User = require('../models/User')
const Item = require('../models/Item')

// This function is responsible for adding new items to the cart and updating existing ones.
const addToCart = async (req, res) => {
  const userId = req.params.userId
  const { items } = req.body
  console.log('Items received:', items)

  try {
    const foundedUser = await User.findById(userId)
    if (!foundedUser) {
      console.error('User not found')
      return res.status(404).json({ error: 'User not found' })
    }

    if (!Array.isArray(items)) {
      console.error('Items must be an array')
      return res.status(400).json({ error: 'Items must be an array.' })
    }

    let cart = await Cart.findOne({
      user: userId,
      checked_out: false
    }).populate('items.item')

    if (cart) {
      for (let newItem of items) {
        let existingItem = cart.items.find(
          (item) => item.item._id.toString() === newItem.item.toString()
        )
        if (existingItem) {
          console.log('Updating item quantity:', newItem.item)
          existingItem.quantity = newItem.quantity
        } else {
          console.log('Adding new item:', newItem.item)
          const itemDetails = await Item.findById(newItem.item)
          if (!itemDetails) {
            console.error('Item not found:', newItem.item)
            return res.status(404).json({ error: 'Item not found' })
          }
          cart.items.push({ item: itemDetails, quantity: newItem.quantity })
        }
      }
      cart.total_price = cart.items.reduce((total, item) => {
        if (
          !item.item.price ||
          isNaN(item.item.price) ||
          !item.quantity ||
          isNaN(item.quantity)
        ) {
          console.error('Invalid price or quantity for item:', item)
          throw new Error('Invalid price or quantity')
        }
        return total + item.item.price * item.quantity
      }, 0)

      cart.date = new Date()
    } else {
      console.log('Creating new cart')
      const populatedItems = await Promise.all(
        items.map(async (newItem) => {
          const itemDetails = await Item.findById(newItem.item)
          if (!itemDetails) {
            console.error('Item not found:', newItem.item)
            throw new Error('Item not found')
          }
          return { item: itemDetails, quantity: newItem.quantity }
        })
      )
      cart = new Cart({
        user: userId,
        items: populatedItems,
        checked_out: false,
        date: new Date(),
        total_price: populatedItems.reduce(
          (total, item) => total + item.item.price * item.quantity,
          0
        )
      })
    }

    const savedCart = await cart.save()
    console.log('Cart saved:', savedCart)

    if (!foundedUser.cart.includes(savedCart._id)) {
      console.log('Adding cart to user')
      foundedUser.cart.push(savedCart._id)
      await foundedUser.save()
    }

    res.json(savedCart)
  } catch (err) {
    console.error('Internal Server Error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

//http://localhost:3001/cart/:userId

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
