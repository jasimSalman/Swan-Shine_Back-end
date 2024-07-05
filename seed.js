require('dotenv').config()
require('./config/database')

const Category = require('./models/Category')
const Shop = require('./models/Shop')

const shopData = [
  {
    name: 'Al Alawi Jewellery',
    email: 'sarah.alalawi@mail.com',
    items: [],
    location: 'Manama',
    poster: 'https://www.none.com'
  },
  {
    name: 'Salman Gold Shop',
    email: 'Jassim@mail.com',
    items: [],
    location: 'Sitra',
    poster: 'https://www.none.com'
  },
  {
    name: 'Jellooo Gold Shop',
    email: 'Jello@mail.com',
    items: [],
    location: 'Bilad Alqadeem',
    poster: 'https://www.none.com'
  },
  {
    name: 'Jenan Jewellery',
    email: 'Jenan@mail.com',
    items: [],
    location: 'Hamad Town',
    poster: 'https://www.none.com'
  }
]

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

//Insert Shops
const seedShops = async () => {
  try {
    await Shop.insertMany(shopData)
    console.log('Shops inserted successfully')
  } catch (err) {
    console.error('Error seeding shops', err)
  }
}

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
seedShops()
