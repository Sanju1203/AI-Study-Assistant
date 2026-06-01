const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes =
  require("./routes/authRoutes")

const noteRoutes =
  require("./routes/noteRoutes")

const flashcardRoutes =
  require("./routes/flashcardRoutes")

const quizRoutes =
  require("./routes/quizRoutes")

const plannerRoutes =
  require("./routes/plannerRoutes")

const aiRoutes =
  require("./routes/aiRoutes")

const app = express()

/* =========================
   MIDDLEWARE
========================= */

app.use(cors())

app.use(express.json())

/* =========================
   ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
)

app.use(
  "/api/notes",
  noteRoutes
)

app.use(
  "/api/flashcards",
  flashcardRoutes
)

app.use(
  "/api/quizzes",
  quizRoutes
)

app.use(
  "/api/planner",
  plannerRoutes
)

app.use(
  "/api/ai",
  aiRoutes
)

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {

  res.send("AI Study Assistant API Running")

})

/* =========================
   DATABASE CONNECTION
========================= */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB Connected")

  app.listen(

    process.env.PORT || 5000,

    () => {

      console.log(

        `Server running on port ${
          process.env.PORT || 5000
        }`

      )

    }

  )

})

.catch((error) => {

  console.log(error)

})