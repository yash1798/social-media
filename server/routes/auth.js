const express = require("express")
const { signup, signin, signout } = require("../controllers/auth")
const { userById } = require("../controllers/user")
const { signupValidator, signinValidator } = require("../validator")

const router = express.Router()

router.post("/signup", signupValidator, signup)
router.post("/signin", signinValidator, signin)
router.get("/signout", signout)

router.param("userId", userById)

module.exports = router
