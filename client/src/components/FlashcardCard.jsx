export default function FlashcardCard({
  flashcard,
  onEdit,
  onDelete
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <div>
        <h2 className="text-xl font-bold">
          {flashcard.question}
        </h2>
        <p className="text-gray-500 mt-3">
          {flashcard.answer}
        </p>
      </div>
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onEdit(flashcard)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(flashcard._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
