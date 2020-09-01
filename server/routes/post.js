const express = require("express")
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
} = require("../controllers/post")
const { requireSignedIn } = require("../controllers/auth")
const { userById, hasAuthorization } = require("../controllers/user")

const validator = require("../validator")

const router = express.Router()

router.get("/", getPosts)
router.post(
  "/post/new/:userId",
  requireSignedIn,
  createPost,
  validator.createPostValidator
)
router.get("/post/by/:userId", requireSignedIn, postByUser)
router.delete("/post/:postId", requireSignedIn, isPoster, deletePost)
router.put("/post/:postId", requireSignedIn, isPoster, updatePost)

router.param("userId", userById)
router.param("postId", postById)

module.exports = router
