import FlashcardCard from "./FlashcardCard"

export default function FlashcardList({

  flashcards,
  onEdit,
  onDelete

}) {

  if (flashcards.length === 0) {

    return (

      <div className="text-gray-500">
        No flashcards available
      </div>

    )

  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {flashcards.map((flashcard) => (

        <FlashcardCard
          key={flashcard._id}
          flashcard={flashcard}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>

  )

}