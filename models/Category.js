const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema(
  {
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    poster: { type: String, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Category', CategorySchema)
