export default function PlannerCard({

  task,
  onEdit,
  onDelete,
  onToggleComplete

}) {

  const isOverdue =
    !task.completed &&
    new Date(task.deadline) < new Date()

  return (

    <div
      className={`p-5 rounded-2xl shadow-md bg-white border-l-8

        ${
          task.completed

            ? "border-green-500"

            : isOverdue

            ? "border-red-500"

            : "border-blue-500"
        }
      `}
    >

      {/* TITLE */}

      <h2
        className={`text-2xl font-bold

          ${
            task.completed
              ? "line-through text-gray-400"
              : ""
          }
        `}
      >

        {task.title}

      </h2>

      {/* DESCRIPTION */}

      <p className="mt-3 text-gray-600">

        {task.description}

      </p>

      {/* DEADLINE */}

      <p className="mt-4 text-sm text-gray-500">

        Deadline:

        {" "}

        {new Date(
          task.deadline
        ).toLocaleDateString()}

      </p>

      {/* STATUS */}

      <div className="mt-3">

        {task.completed ? (

          <span className="text-green-600 font-bold">
            Completed
          </span>

        ) : isOverdue ? (

          <span className="text-red-600 font-bold">
            Overdue
          </span>

        ) : (

          <span className="text-blue-600 font-bold">
            Pending
          </span>

        )}

      </div>

      {/* ACTION BUTTONS */}

      <div className="flex flex-wrap gap-3 mt-5">

        <button
          onClick={() => onToggleComplete(task)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          {task.completed
            ? "Undo"
            : "Complete"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>

  )

}