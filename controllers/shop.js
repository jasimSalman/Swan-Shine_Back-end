const axios = require('axios')
const Shop = require('../models/Shop')

const index = async (req, res) => {
  try {
    const shops = await Shop.find({})
    res.json(shops)
  } catch (err) {
    console.error('Error fetching shops', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
} // http://localhost:3001/shop

module.exports = {
  index
}
