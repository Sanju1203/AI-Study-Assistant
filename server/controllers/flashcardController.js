const Flashcard = require("../models/Flashcard")

// CREATE
const createFlashcard = async (req, res) => {

  try {

    const { question, answer } = req.body

    const flashcard = await Flashcard.create({

      question,
      answer,
      user: req.user._id

    })

    res.status(201).json(flashcard)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// GET
const getFlashcards = async (req, res) => {

  try {

    const flashcards = await Flashcard.find({

      user: req.user._id

    })

    res.json(flashcards)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// UPDATE
const updateFlashcard = async (req, res) => {

  try {

    const flashcard = await Flashcard.findById(req.params.id)

    if (!flashcard) {

      return res.status(404).json({
        message: "Flashcard not found"
      })

    }

    flashcard.question =
      req.body.question || flashcard.question

    flashcard.answer =
      req.body.answer || flashcard.answer

    const updatedFlashcard =
      await flashcard.save()

    res.json(updatedFlashcard)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// DELETE
const deleteFlashcard = async (req, res) => {

  try {

    const flashcard = await Flashcard.findById(req.params.id)

    if (!flashcard) {

      return res.status(404).json({
        message: "Flashcard not found"
      })

    }

    await flashcard.deleteOne()

    res.json({
      message: "Flashcard deleted"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {

  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard

}