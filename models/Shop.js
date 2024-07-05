const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShopSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    poster: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    location: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Shop', ShopSchema)
