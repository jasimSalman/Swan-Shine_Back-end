const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    sold_quantity: { type: Number }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', ItemSchema)
