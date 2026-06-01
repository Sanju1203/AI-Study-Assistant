import { Link } from "react-router-dom"

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <Link
          to="/notes"
          className="bg-cyan-500 text-white p-4 rounded-xl text-center font-semibold hover:opacity-90"
        >
          Create Notes
        </Link>

        <Link
          to="/quiz"
          className="bg-gray-900 text-white p-4 rounded-xl text-center font-semibold hover:opacity-90"
        >
          Start Quiz
        </Link>

        <Link
          to="/flashcards"
          className="bg-purple-500 text-white p-4 rounded-xl text-center font-semibold hover:opacity-90"
        >
          Flashcards
        </Link>

        <Link
          to="/ai-chats"
          className="bg-green-500 text-white p-4 rounded-xl text-center font-semibold hover:opacity-90"
        >
          AI Chat
        </Link>

      </div>

    </div>
  )
}