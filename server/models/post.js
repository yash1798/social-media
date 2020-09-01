const mongoose = require("mongoose")
const { ObjectID } = require("mongodb")
const { Schema } = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    data: "Buffer",
    contenType: "String",
  },
  postedBy: {
    type: ObjectID,
    ref: "User",
  },
  created: {
    type: "Date",
    default: Date.now,
  },
})

module.exports = mongoose.model("Post", postSchema)
