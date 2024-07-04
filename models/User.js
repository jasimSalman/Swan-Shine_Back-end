const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    first_ame: { type: String, required: true },
    last_name: { type: String, required: true },
    cr: String,
    fav_list: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    place: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
