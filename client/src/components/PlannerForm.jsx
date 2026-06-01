export default function PlannerForm({

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

      {/* TITLE */}

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      {/* DESCRIPTION */}

      <textarea
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg h-32"
        required
      />

      {/* DEADLINE */}

      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      {/* BUTTON */}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {editingId
          ? "Update Task"
          : "Add Task"}
      </button>

    </form>

  )

}