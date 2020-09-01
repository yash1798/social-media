const Post = require("../models/post")
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name email")
    .exec((err, post) => {
      if (err || !post)
        return res.status(400).json({ error: "Something happened!!!" })

      req.post = post
      next()
    })
}

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .populate("postedBy", "_id email name")
    .select("_id title body")
    .then((posts) => {
      res.json({ posts })
    })
    .catch((err) => console.log(err))
}

exports.createPost = (req, res, next) => {
  let form = formidable.IncomingForm()

  form.keepExtensions = true

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(400).json({ error: "Something happened!!!" })

    let post = new Post(fields)

    req.profile.password = undefined

    post.postedBy = req.profile

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contenType = files.photo.type
    }
    post.save((err, result) => {
      if (err) return res.status(400).json({ error: "Something happened!!!" })
      console.log(result)
      res.json(result)
      next()
    })
  })
}

exports.postByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name email")
    .sort("created")
    .exec((err, result) => {
      if (err) return res.status(400).json({ error: "Something happened!!!" })

      res.json(result)
    })
}

exports.isPoster = (req, res, next) => {
  const didPost = req.post && req.auth && req.post.postedBy._id == req.auth.id
  if (!didPost) return res.status(400).json({ error: "Access Denied!!!" })
  if (didPost) {
    next()
  }
}

exports.deletePost = (req, res) => {
  let post = req.post
  post.remove((err, result) => {
    if (err) return res.status(404).json({ error: "Post Not Found!!!" })
    if (result) return res.json({ msg: "Removed!!!" })
  })
}

exports.updatePost = (req, res) => {
  let post = req.post
  post = _.extend(post, req.body)
  post.save()
  res.json(post)
}
