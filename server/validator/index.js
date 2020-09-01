const expressJWT = require("express-jwt")

exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty()
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  })
  // body
  req.check("body", "Write a body").notEmpty()
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000,
  })
  // check for errors
  const errors = req.validationErrors()
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  // proceed to next middleware
  next()
}

exports.signupValidator = (req, res, next) => {
  //email
  req
    .check("email")
    .notEmpty()
    .withMessage("e-Mail should not be empty!!!")
    .isEmail()
    .withMessage("Please enter a valid e-Mail")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("e-Mail should be be between 4 to 32 characters")

  //name
  req
    .check("name")
    .notEmpty()
    .withMessage("Name should not be empty!!!")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("Name should be be between 4 to 32 characters")
  //password
  req
    .check("password")
    .notEmpty()
    .withMessage("Password should not be empty!!!")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("Password should be be between 4 to 32 characters")

  //errors
  const errors = req.validationErrors()
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  // proceed to next middleware
  next()
  //next
}

exports.signinValidator = (req, res, next) => {
  //email
  req
    .check("email")
    .notEmpty()
    .withMessage("e-Mail should not be empty!!!")
    .isEmail()
    .withMessage("Please enter a valid e-Mail")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("e-Mail should be be between 4 to 32 characters")

  //password
  req
    .check("password")
    .notEmpty()
    .withMessage("Password should not be empty!!!")
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("Password should be be between 4 to 32 characters")

  //errors
  const errors = req.validationErrors()
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]
    return res.status(400).json({ error: firstError })
  }
  // proceed to next middleware
  next()
  //next
}
