const User = require('../models/User')
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
        state: false
      })
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

    if (matched && user.state !== false) {
      let payload = {
        id: user._id,
        username: user.username,
        type: user.type
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

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession
}
