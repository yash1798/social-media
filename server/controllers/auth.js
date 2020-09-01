const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const expressJWT = require("express-jwt")
const dotenv = require("dotenv")
dotenv.config()

exports.signup = async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email })
  if (userExist) {
    return res.status(500).json({ error: "User already exists!!!" })
  }
  const plainPassword = req.body.password

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(plainPassword, salt)

  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
  })
  await user.save()

  res.json({ msg: "Signup completed!!!!" })
}

exports.signin = async (req, res) => {
  // find the user
  const email = req.body.email
  const user = await User.findOne({ email })
  if (!user) {
    return res
      .status(401)
      .json({ error: "Please enter a valid email or password" })
  }

  const userPlainPassword = req.body.password

  const passwordMatch = await bcrypt.compare(userPlainPassword, user.password)

  if (!passwordMatch) {
    return res
      .status(401)
      .json({ error: "Please enter a valid email or password" })
  }
  // authenticate
  if (passwordMatch) {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    //response

    res.cookie("t", token, { expire: new Date() + 3600000000000000 })
    res.json({ token, id: user._id, email: user.email, name: user.name })
  }
}

exports.signout = async (req, res) => {
  res.clearCookie("t")
  return res.json({ msg: "Signout Sucessfull!!!" })
}

exports.requireSignedIn = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
})
