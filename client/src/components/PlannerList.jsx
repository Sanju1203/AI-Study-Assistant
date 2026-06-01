import PlannerCard from "./PlannerCard"

export default function PlannerList({

  tasks,
  onEdit,
  onDelete,
  onToggleComplete

}) {

  if (tasks.length === 0) {

    return (

      <div className="text-gray-500">
        No tasks available
      </div>

    )

  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {tasks.map((task) => (

        <PlannerCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />

      ))}

    </div>

  )

}