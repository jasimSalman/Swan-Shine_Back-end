const User = require('../models/User')
const Shop = require('../models/Shop')
const Item = require('../models/Item')
const Cart = require('../models/Cart')
const middleware = require('../middleware/index')

const Register = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password, type, cr } =
      req.body

    let existingUser = await User.findOne({ username })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that username has already been registered!')
    }

    let passwordDigest = await middleware.hashPassword(password)
    let user
    if (type === 'owner') {
      user = await User.create({
        first_name,
        last_name,
        username,
        email,
        passwordDigest,
        type,
        cr,
        state: false,
        shop: null
      })
      await user.save()
      return res.status(201).send({ message: 'Pending approval' })
    } else {
      user = await User.create({
        first_name,
        last_name,
        username,
        email,
        passwordDigest,
        type,
        cr
      })
      res.status(201).send(user)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred while registering the user.')
  }
} // http://localhost:3001/user/register

const Login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res
        .status(401)
        .send({ status: 'Error', msg: 'Unauthorized: User not found' })
    }

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )

    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        type: user.type,
        shop: user.type === 'owner' ? user.shop : null,
        state: user.type === 'owner' ? user.state : null
      }

      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
} // http://localhost:3001/user/login

const UpdatePassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body

    let founded_user = await User.findOne({ username })

    if (!founded_user) {
      return res.status(404).send({ status: 'Error', msg: 'User not found' })
    }

    let passwordDigest = await middleware.hashPassword(newPassword)
    founded_user.passwordDigest = passwordDigest
    await founded_user.save()

    res.send({ status: 'Password Updated!' })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: 'Error',
      msg: 'An error has occurred updating the password!'
    })

    let payload = {
      id: founded_user.id,
      email: founded_user.email
    }
    return res.send({ status: 'Password Updated!', user: payload })
  }
} // http://localhost:3001/user/reset-password

//Display shop items for the owner
const GetShopItems = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId).populate('shop')
    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }

    if (user.type !== 'owner' || !user.shop) {
      return res.status(400).send({ message: 'User does not own a shop!' })
    }

    const items = await Item.find({ shop: user.shop._id })
    res.status(200).send(items)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}
// http://localhost:3001/user/shop/:userId/items

// this function will display all orders to the shop owner
const GetShopOrders = async (req, res) => {
  try {
    const { shopId } = req.params
    const userId = res.locals.payload.id
    console.log(`User Id ==> ${userId}`)

    const shop = await Shop.findById(shopId)

    if (!shop) {
      return res.status(404).send({ Message: 'Shop not found !' })
    }

    if (shop.owner.toString() !== userId) {
      return res.status(401).send({ Message: 'Unauthorized Access' })
    }

    const carts = await Cart.find({ checked_out: true })
      .populate('items.item')
      .populate('user')

    // const shopOrders = carts.filter((cart) =>
    //   cart.items.some(cartItem.item.shop.toString() === shopId)
    // )
    // if (shopOrders.length === 0) {
    //   return res.status(404).send({ Message: 'No orders yet for this shop !' })
    // }
    res.send(carts)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error !')
  }
} // http://localhost:3001/user/shop/:shopId/orders

//This function allows admin to accept shop owner

const AcceptShopOwner = async (req, res) => {
  try {
    const userId = req.params.userId
    console.log(userId)

    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).send('User not found!')
    }
    if (user.type !== 'owner') {
      return res.status(400).send('User is not a shop owner')
    }
    const shop = await Shop.create()
    console.log(shop)
    user.state = true
    user.shop = shop
    await user.save()

    res.status(200).send({ message: 'Shop owner has been approved' })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
} // http://localhost:3001/user/admin/accept-shop-owner/:userId

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const RejectShopOwner = async (req, res) => {
  try {
    const { userId } = req.params

    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).send('User not found')
    }

    if (user.type !== 'owner') {
      return res.status(400).send('User is not a shop owner')
    }

    await User.deleteOne({ _id: userId })

    res
      .status(200)
      .send({ message: 'Shop owner registration has been rejected' })
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
} // http://localhost:3001/user/admin/reject-shop-owner/:userId

// Delete an owner
const DeleteOwner = async (req, res) => {
  try {
    const { userId } = req.params

    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).send('User not found')
    }

    if (user.type !== 'owner') {
      return res.status(400).send('User is not a shop owner')
    }
    await Shop.deleteOne({ owner: userId })

    await Item.deleteMany({ shop: user.shop })

    await User.deleteOne({ _id: userId })

    res.status(200).send({ message: 'Shop owner has been deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error')
  }
} // http://localhost:3001/users/admin/delete-shop-owner/:userId

const GetAllShopOwners = async (req, res) => {
  try {
    const adminId = res.locals.payload.id

    const admin = await User.findById(adminId)

    if (!admin || admin.type !== 'admin') {
      return res.status(403).send('Unauthorized access')
    }
    const shopOwners = await User.find({ type: 'owner' })

    if (shopOwners.length === 0) {
      return res.status(404).send('No shop owners found !')
    }
    res.status(200).send(shopOwners)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
} //http://localhost:3001/users/admin/admin/shop-owners

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
  GetShopItems,
  GetShopOrders,
  AcceptShopOwner,
  RejectShopOwner,
  DeleteOwner,
  GetAllShopOwners
}
