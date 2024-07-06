const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cr: { type: String, default: '' }, //only for owner's
    fav_list: [{ type: Schema.Types.ObjectId, ref: 'Item' }], //only for user's
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' }, //only for owner's
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }], //only for user's
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ], //only for user's
    state: { type: Boolean }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
