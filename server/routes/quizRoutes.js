const express = require("express")

const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {

  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz

} = require("../controllers/quizController")

router.route("/")
  .post(protect, createQuiz)
  .get(protect, getQuizzes)

router.route("/:id")
  .put(protect, updateQuiz)
  .delete(protect, deleteQuiz)

module.exports = router