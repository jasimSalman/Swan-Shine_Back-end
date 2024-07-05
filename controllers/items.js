const Item = require('../models/Item')

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
}

module.exports = {
  index
}
