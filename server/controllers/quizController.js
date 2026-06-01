const Quiz = require("../models/Quiz")

// CREATE QUIZ
const createQuiz = async (req, res) => {

  try {

    const {

      question,
      options,
      correctAnswer

    } = req.body

    const quiz = await Quiz.create({

      question,
      options,
      correctAnswer,
      user: req.user._id

    })

    res.status(201).json(quiz)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// GET QUIZZES
const getQuizzes = async (req, res) => {

  try {

    const quizzes = await Quiz.find({

      user: req.user._id

    })

    res.json(quizzes)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// UPDATE QUIZ
const updateQuiz = async (req, res) => {

  try {

    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {

      return res.status(404).json({
        message: "Quiz not found"
      })

    }

    quiz.question =
      req.body.question || quiz.question

    quiz.options =
      req.body.options || quiz.options

    quiz.correctAnswer =
      req.body.correctAnswer || quiz.correctAnswer

    const updatedQuiz =
      await quiz.save()

    res.json(updatedQuiz)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// DELETE QUIZ
const deleteQuiz = async (req, res) => {

  try {

    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {

      return res.status(404).json({
        message: "Quiz not found"
      })

    }

    await quiz.deleteOne()

    res.json({
      message: "Quiz deleted"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {

  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz

}