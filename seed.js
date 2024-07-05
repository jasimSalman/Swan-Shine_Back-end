require('dotenv').config()
require('./config/database')

const Category = require('./models/Category')
const Shop = require('./models/Shop')

const shopData = [
  {
    name: 'Al Alawi Jewellery',
    owner: 'Sarah Alalawi',
    email: 'sarah.alalawi@mail.com',
    items: [],
    location: 'Manama'
  },
  {
    name: 'Salman Gold Shop',
    owner: 'Jassim Salman',
    email: 'Jassim@mail.com',
    items: [],
    location: 'Sitra'
  },
  {
    name: 'Jellooo Gold Shop',
    owner: 'Jassim Khalaf',
    email: 'Jello@mail.com',
    items: [],
    location: 'Bilad Alqadeem'
  },
  {
    name: 'Jenan Jewellery',
    owner: 'Jenan Zuhair',
    email: 'Jenan@mail.com',
    items: [],
    location: 'Hamad Town'
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
// seedCategories()
// seedShops()
