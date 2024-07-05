const Item = require('../models/Item')
const Shop = require('../models/Shop')
const Category = require('../models/Category')

//This function will retrieve all the items in each category.
const index = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    console.log(`Category Id = ${categoryId}`)
    const items = await Item.find({ category: categoryId })
    res.send(items)

    if (items.length === 0) {
      return res.status(404).send({ message: 'No items found.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Internal server error' })
  }
} //http://localhost:3001/items/:categoryId

//This function is responsible for adding a new item.
const addItem = async (req, res) => {
  try {
    const userId = req.params.userId
    const { name, reqCategory, price, stock, image } = req.body

    const shop = await Shop.findOne({ owner: userId })
    if (!shop) {
      return res.status(404).send('This user has no shop.')
    }

    const founded_category = await Category.findOne({ name: reqCategory })

    if (!founded_category) {
      return res.status(404).send('The category does not exist.')
    }

    const item = await Item.create({
      name,
      category: founded_category._id,
      price,
      stock,
      shop: shop._id,
      image
    })

    shop.items.push(item._id)
    await shop.save()

    founded_category.items.push(item._id)
    await founded_category.save()

    res.status(201).send(item)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Internal server error' })
  }
} //http://localhost:3001/items/:userId

// This function is responsible for update item info.
const update = async (req, res) => {
  const itemId = req.params.itemId
  const payload = req.body
  try {
    const item = await Item.findByIdAndUpdate(itemId, payload, {
      new: true,
      runValidators: true
    })

    if (!item) {
      return res.status(404).send({ error: 'Item not found' })
    }
    res.status(200).send(item)
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Internal Server Error' })
  }
} // http://localhost:3001/:userId/:itemId

module.exports = {
  index,
  addItem,
  update
}
