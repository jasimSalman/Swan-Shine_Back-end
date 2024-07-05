const axios = require('axios')
const Category = require('../models/Category')

const index = async (req, res) => {
  const categories = await Category.find({})
}

module.exports = {
  index
}
