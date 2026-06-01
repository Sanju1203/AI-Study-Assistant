export default function QuizForm({

  formData,
  handleChange,
  handleOptionChange,
  handleSubmit,
  editingId

}) {

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >

      {/* QUESTION */}

      <input
        type="text"
        name="question"
        placeholder="Enter question"
        value={formData.question}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      {/* OPTIONS */}

      {formData.options.map((option, index) => (

        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) =>
            handleOptionChange(index, e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />

      ))}

      {/* CORRECT ANSWER */}

      <input
        type="text"
        name="correctAnswer"
        placeholder="Correct Answer"
        value={formData.correctAnswer}
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
          ? "Update Quiz"
          : "Add Quiz"}
      </button>

    </form>

  )

}