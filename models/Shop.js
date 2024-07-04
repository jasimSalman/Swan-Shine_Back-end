const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    location: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Shop', UserSchema)
