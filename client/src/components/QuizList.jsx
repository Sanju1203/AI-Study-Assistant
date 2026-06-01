import QuizCard from "./QuizCard"

export default function QuizList({

  quizzes,
  onEdit,
  onDelete

}) {

  if (quizzes.length === 0) {

    return (

      <div className="text-gray-500">
        No quizzes available
      </div>

    )

  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {quizzes.map((quiz) => (

        <QuizCard
          key={quiz._id}
          quiz={quiz}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>

  )

}