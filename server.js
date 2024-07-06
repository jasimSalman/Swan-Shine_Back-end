const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001

require('./config/database')

const categoryRouter = require('./routes/category')
const itemsRouter = require('./routes/items')
const shopRouter = require('./routes/shop')
const usersRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const wishlistRouter = require('./routes/wishlist')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/category', categoryRouter)
app.use('/items', itemsRouter)
app.use('/shop', shopRouter)
app.use('/users', usersRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
