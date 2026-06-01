export default function NoteCard({

  note,
  onEdit,
  onDelete

}) {

  return (

    <div className="bg-white p-5 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold">
        {note.title}
      </h2>

      <p className="mt-3 text-gray-600 whitespace-pre-line">
        {note.content}
      </p>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>

      </div>

    </div>

  )

}