const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ReviewSchema = new Schema(
  {
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    poster: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Integer, required: true },
    items: { type: Schema.Types.ObjectId, ref: 'Item' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', ReviewSchema)
