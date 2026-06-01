const express = require("express")

const router = express.Router()

const protect = require("../middleware/authMiddleware")

const {

  createNote,
  getNotes,
  updateNote,
  deleteNote

} = require("../controllers/noteController")

router.route("/")
  .post(protect, createNote)
  .get(protect, getNotes)

router.route("/:id")
  .put(protect, updateNote)
  .delete(protect, deleteNote)

module.exports = router