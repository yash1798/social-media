const express = require("express")

const { allUsers, getUser, hasAuthorization } = require("../controllers/user")
const { userById, updateUser, deleteUser } = require("../controllers/user")
const { requireSignedIn } = require("../controllers/auth")

const router = express.Router()

router.get("/users", allUsers)
router.get("/user/:userId", requireSignedIn, getUser)
router.put("/user/:userId", requireSignedIn, hasAuthorization, updateUser)
router.delete("/user/:userId", requireSignedIn, hasAuthorization, deleteUser)

router.param("userId", userById)

module.exports = router
