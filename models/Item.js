const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    shop: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    price: { type: Integer, required: true },
    stock: { type: Integer, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    sold_quantity: { type: Integer, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', ItemSchema)
