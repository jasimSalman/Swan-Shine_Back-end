const axios = require('axios')
const Category = require('../models/Category')

const index = async (req, res) => {
  try {
    const categories = await Category.find({})
    res.json(categories) // Send categories as JSON response
  } catch (err) {
    console.error('Error fetching categories', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  index
}
