const axios = require('axios')
const Category = require('../models/Category')

const index = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.json(categories)
  } catch (err) {
    console.error('Error fetching categories', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
} //http://localhost:3001/category

module.exports = {
  index
}
