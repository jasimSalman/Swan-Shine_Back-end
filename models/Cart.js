const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartItemSchema = new Schema(
  {
    item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
)

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [CartItemSchema],
    checked_out: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now },
    total_price: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Cart', CartSchema)
