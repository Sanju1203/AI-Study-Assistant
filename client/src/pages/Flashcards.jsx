import { useEffect, useState } from "react"

import {

  createFlashcard,
  getFlashcards,
  updateFlashcard,
  deleteFlashcard

} from "../services/api"

export default function Flashcards() {

  const [flashcards, setFlashcards] =
    useState([])

  const [searchTerm, setSearchTerm] =
    useState("")

  const [question, setQuestion] =
    useState("")

  const [answer, setAnswer] =
    useState("")

  const [editingId, setEditingId] =
    useState(null)

  const fetchFlashcards = async () => {

    try {

      const data =
        await getFlashcards()

      setFlashcards(data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    const loadFlashcards = async () => {
      await fetchFlashcards()
    }

    loadFlashcards()

  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (editingId) {

        await updateFlashcard(

          editingId,

          {

            question,
            answer

          }

        )

        setEditingId(null)

      } else {

        await createFlashcard({

          question,
          answer

        })

      }

      setQuestion("")
      setAnswer("")

      fetchFlashcards()

    } catch (error) {

      console.log(error)

    }

  }

  const handleEdit = (flashcard) => {

    setEditingId(
      flashcard._id
    )

    setQuestion(
      flashcard.question
    )

    setAnswer(
      flashcard.answer
    )

  }

  const handleDelete = async (id) => {

    try {

      await deleteFlashcard(id)

      fetchFlashcards()

    } catch (error) {

      console.log(error)

    }

  }

  const filteredFlashcards =
    flashcards.filter(

      (flashcard) =>

        flashcard.question
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        flashcard.answer
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

    )

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Flashcards

      </h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search flashcards..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        className="w-full border p-3 rounded-lg mb-6"
      />

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) =>
            setAnswer(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg h-32"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >

          {editingId

            ? "Update Flashcard"

            : "Add Flashcard"}

        </button>

      </form>

      {/* FLASHCARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {filteredFlashcards.map(

          (flashcard) => (

            <div
              key={flashcard._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="text-xl font-bold">

                Q: {flashcard.question}

              </h2>

              <p className="mt-3">

                A: {flashcard.answer}

              </p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    handleEdit(
                      flashcard
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >

                  Edit

                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      flashcard._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >

                  Delete

                </button>

              </div>

            </div>

          )

        )}

      </div>

    </div>

  )

}