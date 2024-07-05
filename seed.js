require('dotenv').config()
require('./config/database')

const Category = require('./models/Category')

const categoryData = [
  {
    name: 'Necklaces',
    poster: 'https://bla-bla/image.jpg',
    items: []
  },
  {
    name: 'Earrings',
    poster: 'https://bla-bla/image.jpg',
    items: []
  },
  {
    name: 'Bracelets',
    poster: 'https://bla-bla/image.jpg',
    items: []
  },
  {
    name: 'Rings',
    poster: 'https://bla-bla/image.jpg',
    items: []
  },
  {
    name: 'Anklets',
    poster: 'https://bla-bla/image.jpg',
    items: []
  }
]

//Insert Categories
const seedCategories = async () => {
  try {
    await Category.insertMany(categoryData)
    console.log('Seeding categories completed.')
  } catch (err) {
    console.error('Error seeding categories', err)
  }
}

//call function
seedCategories()
