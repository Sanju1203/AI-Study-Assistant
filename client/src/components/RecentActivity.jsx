const activities = [
  {
    title: "Completed React Quiz",
    time: "2 hours ago"
  },
  {
    title: "Created 12 Flashcards",
    time: "5 hours ago"
  },
  {
    title: "AI Chat Session Finished",
    time: "Yesterday"
  }
]

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="border-b pb-4 last:border-none"
          >

            <h3 className="font-semibold text-gray-800">
              {activity.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {activity.time}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}