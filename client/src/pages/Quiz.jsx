import { useCallback, useEffect, useState } from "react"

import {

  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz

} from "../services/api"

import QuizForm from "../components/QuizForm"

import QuizList from "../components/QuizList"

export default function Quiz() {

  const [quizzes, setQuizzes] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const [formData, setFormData] =
    useState({

      question: "",

      options: [

        "",
        "",
        "",
        ""

      ],

      correctAnswer: ""

    })

  /* =========================
     FETCH QUIZZES
  ========================= */

  const fetchQuizzes = useCallback(async () => {

    try {

      const data = await getQuizzes()

      setQuizzes(data)

    } catch (error) {

      console.error(error)

    }

  }, [])

  useEffect(() => {

    let isMounted = true

    const loadQuizzes = async () => {

      try {

        const data = await getQuizzes()

        if (isMounted) {

          setQuizzes(data)

        }

      } catch (error) {

        console.error(error)

      }

    }

    void loadQuizzes()

    return () => {

      isMounted = false

    }

  }, [fetchQuizzes])

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })

  }

  /* =========================
     HANDLE OPTIONS
  ========================= */

  const handleOptionChange = (
    index,
    value
  ) => {

    const updatedOptions =
      [...formData.options]

    updatedOptions[index] = value

    setFormData({

      ...formData,

      options: updatedOptions

    })

  }

  /* =========================
     CREATE / UPDATE
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      // UPDATE
      if (editingId) {

        await updateQuiz(

          editingId,

          formData

        )

        setEditingId(null)

      }

      // CREATE
      else {

        await createQuiz(formData)

      }

      // RESET
      setFormData({

        question: "",

        options: [

          "",
          "",
          "",
          ""

        ],

        correctAnswer: ""

      })

      fetchQuizzes()

    } catch (error) {

      console.log(error)

    }

  }

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {

    try {

      await deleteQuiz(id)

      fetchQuizzes()

    } catch (error) {

      console.log(error)

    }

  }

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (quiz) => {

    setEditingId(quiz._id)

    setFormData({

      question: quiz.question,

      options: quiz.options,

      correctAnswer:
        quiz.correctAnswer

    })

  }

  return (

    <div className="p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Quiz
        </h1>

        <p className="text-gray-500 mt-1">
          Create and practice quizzes
        </p>

      </div>

      <QuizForm

        formData={formData}

        handleChange={handleChange}

        handleOptionChange={
          handleOptionChange
        }

        handleSubmit={handleSubmit}

        editingId={editingId}

      />

      <QuizList

        quizzes={quizzes}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

    </div>

  )

}