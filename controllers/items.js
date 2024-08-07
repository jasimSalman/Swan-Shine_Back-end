const Item = require('../models/Item')
const Shop = require('../models/Shop')
const Category = require('../models/Category')
const Cart = require('../models/Cart')
const Review = require('../models/Review')

//This function will retrieve all the items in each category.
const index = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    console.log(`Category Id = ${categoryId}`)

    if (!categoryId) {
      return res.status(400).send({ message: 'Category ID is required.' })
    }

    const items = await Item.find({ category: categoryId })

    // if (items.length === 0) {
    //   return res.status(404).send({ message: 'No items found.' })
    // }

    res.send(items)
  } catch (err) {
    console.error('Error fetching items:', err)
    res.status(500).send({ message: 'Internal server error' })
  }
}
//http://localhost:3001/items/:categoryId

//This function will show the item's details
const show = async (req, res) => {
  const itemId = req.params.itemId

  try {
    const item = await Item.findOne({ _id: itemId })
    if (!item) {
      return res.status(404).send('Item not found!')
    }

    res.json(item)
  } catch (err) {
    console.error('Error fetching item details', err)
    res.status(500).send('Internal Server Error')
  }
} //http://localhost:3001/items/show/:itemId

//This function is responsible for adding a new item.
const addItem = async (req, res) => {
  try {
    const userId = req.params.userId
    const { name, reqCategory, price, stock, image } = req.body
    console.log(userId, name, reqCategory, price, stock, image)

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
} // http://localhost:3001/items/:itemId

//This function is responsible for delete an item.
const deleteItem = async (req, res) => {
  const itemId = req.params.itemId

  try {
    // Remove the item from the category
    await Category.findOneAndUpdate(
      { items: itemId },
      { $pull: { items: itemId } }
    )

    // Remove the item from the user carts
    await Cart.updateMany({ items: itemId }, { $pull: { items: itemId } })

    // Remove the item from the shops
    await Shop.findOneAndUpdate({ items: itemId }, { $pull: { items: itemId } })

    // Remove the item itself
    const item = await Item.findByIdAndDelete(itemId)

    if (!item) {
      return res.status(404).send({ message: 'Item not found' })
    }

    res.status(200).send({ message: 'Item deleted successfully' })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Internal Server Error' })
  }
}

// This function  is responsible for retrive all the reviews of a specific item.
const showReview = async (req, res) => {
  try {
    const itemId = req.params.itemId

    const item = await Item.findById(itemId).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username'
      }
    })
    if (!item) {
      return res.status(404).send({ error: 'Item not found' })
    }

    res.send(item.reviews)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while fetching reviews.' })
  }
} // http://localhost:3001/items/:itemId/reviews

//This function will add a new review.
const addReview = async (req, res) => {
  const { content: reviewText, rating } = req.body
  const userId = req.params.userId
  const itemId = req.params.itemId

  try {
    const review = new Review({
      content: String(reviewText),
      rating,
      user: userId,
      item: itemId
    })
    const createdReview = await review.save()

    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).send({ message: 'Item not found' })
    }

    item.reviews.push(createdReview._id)
    await item.save()

    res.status(201).send(createdReview)
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal Server Error' })
  }
} // http://localhost:3001/items/:itemId/reviews/:userId

const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId

  try {
    const review = await Review.findById(reviewId).populate('item')
    if (!review) {
      return res.status(404).send('Review not found')
    }
    await Item.updateMany(
      { _id: review.item._id },
      { $pull: { reviews: reviewId } }
    )
    const deleted = await Review.findByIdAndDelete(reviewId)

    if (!deleted) {
      return res.status(404).send({ message: 'Review could not be deleted' })
    }

    res.status(200).send({ message: 'Review deleted successfully', deleted })
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Internal Server Error' })
  }
} //http://localhost:3001/items/:itemId/reviews/:reviewId

module.exports = {
  index,
  show,
  addItem,
  update,
  deleteItem,
  showReview,
  addReview,
  deleteReview
}
