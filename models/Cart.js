const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    quantity: { type: Integer, required: true },
    checked_out: { type: Boolean, required: true, default: 'false' },
    date: { type: Date, required: true },
    total_price: { type: Integer, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Cart', CartSchema)
