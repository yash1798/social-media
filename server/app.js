const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const expressValidator = require("express-validator")
const dotenv = require("dotenv")
dotenv.config()

// db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`)
})

// bring in routes
const postRoutes = require("./routes/post")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

// middleware

app.use(morgan("dev"))

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(expressValidator())

//routes
app.use("/", postRoutes)
app.use("/", authRoutes)
app.use("/", userRoutes)
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Not Signed-in!!!" })
  }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`)
})
