const axios = require('axios')
const { models } = require('mongoose')
const Category = require(/models/Category)



const show = async (req,res) => {
  const categoryId = req.params.id
  try {
    const category = await Category.findOne({ id: categoryId })
    if (!category) {
      return res.status(404).send('Category is not found')
    }

    console.log(category)
    return res.status(200).send(category)
  } catch (error) {
    console.error('Error fetching category details:', error)
    res.status(500).send('Error fetching category details')
  }
}

module.exports = {
 show 

}