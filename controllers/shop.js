const Shop = require('../models/Shop')
const Item = require('../models/Item')

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
    const items = await Item.find({ shop: shopId })
    res.json(items)
  } catch (err) {
    console.error(`Error fetching items for shop ${shopId}`, err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
} // http://localhost:3001/shop/shopId/items

module.exports = {
  index,
  getItemsByShop
}
