import NoteCard from "./NoteCard"

export default function NotesList({

  notes,
  onEdit,
  onDelete

}) {

  if (notes.length === 0) {

    return (

      <div className="text-gray-500">
        No notes available
      </div>

    )

  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {notes.map((note) => (

        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

    </div>

  )

}