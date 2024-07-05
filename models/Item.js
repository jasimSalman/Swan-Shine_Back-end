const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    shop: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    category: [{ type: Schema.Types.ObjectId, ref: 'category' }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    sold_quantity: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', UserSchema)
