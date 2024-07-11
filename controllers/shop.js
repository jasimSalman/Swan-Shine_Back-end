const Shop = require('../models/Shop')
const Item = require('../models/Item')
const User = require('../models/User')

//display all shops
const index = async (req, res) => {
  try {
    const shops = await Shop.find({})
    res.json(shops)
  } catch (err) {
    console.error('Error fetching shops', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
} // http://localhost:3001/shop

//get items by shop id
const getItemsByShop = async (req, res) => {
  const shopId = req.params.shopId
  try {
    const items = await Item.find({ shop: shopId }).populate('shop')
    res.json(items)
  } catch (err) {
    console.error(`Error fetching items for shop ${shopId}`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
} // http://localhost:3001/shop/shopId/items

const createShop = async (req, res) => {
  const userId = req.params.userId
  const { shopname, email, poster, location } = req.body
  console.log(shopname, email, poster, location)

  if (!shopname || !email || !poster || !location) {
    console.error('Missing required fields')
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const user = await User.findById(userId)

    if (!user) {
      console.error('User not found')
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.shop) {
      console.error('User already has a shop')
      return res.status(400).json({ message: 'User already has a shop' })
    }

    const shop = await Shop.create({
      name: shopname,
      owner: userId,
      email,
      poster,
      location
    })

    user.shop = shop._id
    await user.save()

    return res.status(201).json({ message: 'Shop created successfully', shop })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ message: 'Server error', error: err.message })
  }
}
//http://localhost:3001/shop/:userId

module.exports = {
  index,
  getItemsByShop,
  createShop
}
