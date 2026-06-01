const express = require("express")

const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {

  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard

} = require("../controllers/flashcardController")

router.route("/")
  .post(protect, createFlashcard)
  .get(protect, getFlashcards)

router.route("/:id")
  .put(protect, updateFlashcard)
  .delete(protect, deleteFlashcard)

module.exports = router