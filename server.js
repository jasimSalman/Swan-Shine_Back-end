const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001

require('./config/database')

const categoryRouter = require('./routes/category')
const shopRouter = require('./routes/shop')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/category', categoryRouter)
app.use('/shop', shopRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
