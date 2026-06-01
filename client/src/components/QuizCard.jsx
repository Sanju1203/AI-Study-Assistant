import { useState } from "react"

export default function QuizCard({

  quiz,
  onEdit,
  onDelete

}) {

  const [selectedAnswer, setSelectedAnswer] =
    useState("")

  const [showResult, setShowResult] =
    useState(false)

  const handleCheckAnswer = () => {

    setShowResult(true)

  }

  return (

    <div className="bg-white p-5 rounded-2xl shadow-md">

      <h2 className="text-xl font-bold">
        {quiz.question}
      </h2>

      {/* OPTIONS */}

      <div className="space-y-3 mt-4">

        {quiz.options.map((option, index) => (

          <button
            key={index}
            onClick={() =>
              setSelectedAnswer(option)
            }
            className={`w-full text-left border p-3 rounded-lg transition

              ${
                selectedAnswer === option

                  ? "bg-blue-500 text-white"

                  : "hover:bg-gray-100"
              }
            `}
          >

            {option}

          </button>

        ))}

      </div>

      {/* CHECK ANSWER */}

      <button
        onClick={handleCheckAnswer}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Check Answer
      </button>

      {/* RESULT */}

      {showResult && (

        <div className="mt-4">

          {selectedAnswer === quiz.correctAnswer ? (

            <p className="text-green-600 font-bold">
              Correct Answer
            </p>

          ) : (

            <p className="text-red-600 font-bold">
              Wrong Answer
            </p>

          )}

        </div>

      )}

      {/* ACTION BUTTONS */}

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit(quiz)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(quiz._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  )

}