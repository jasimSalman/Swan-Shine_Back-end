const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5, required: true },
    item: { type: Schema.Types.ObjectId, ref: 'Item' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', ReviewSchema)
