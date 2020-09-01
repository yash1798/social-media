const User = require("../models/user")
const _ = require("lodash")

exports.userById = async (req, res, next, id) => {
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: "User not found!!!" })
  }

  req.profile = user

  next()
}

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile._id && req.auth && req.profile._id == req.auth.id
  if (!authorized) {
    return res.status(403).json({ error: "Access denied!!!" })
  }
  next()
}

exports.allUsers = async (req, res, next) => {
  const users = await User.find()
  if (users) {
    const userSpecific = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        created: user.created,
      }
    })
    res.json({ userSpecific })
  }
  next()
}

exports.getUser = async (req, res, next) => {
  const { _id, name, email, created } = req.profile
  res.json({ _id, name, email, created })
  next()
}

exports.updateUser = (req, res, next) => {
  User.findById(req.profile._id)
    .then((user) => {
      user = _.extend(user, req.body)
      user.save()
      res.json(user)
    })
    .catch((err) => {
      return res.status(401).json({ error: "Something happened" })
    })
}

exports.deleteUser = (req, res, next) => {
  let user = req.profile

  user.remove((err, user) => {
    if (err) return res.satus(400).json({ error: "something happened" })

    res.json({ msg: "User deleted" })
  })
}
