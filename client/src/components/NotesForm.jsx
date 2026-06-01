export default function NotesForm({

  formData,
  handleChange,
  handleSubmit,
  editingId

}) {

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >

      <input
        type="text"
        name="title"
        placeholder="Enter note title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        name="content"
        placeholder="Write your note content..."
        value={formData.content}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-32 outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
      >
        {editingId ? "Update Note" : "Add Note"}
      </button>

    </form>

  )

}