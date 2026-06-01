import { useEffect, useState } from "react"

import {
  getNotes,
  getFlashcards,
  getQuizzes,
  getTasks
} from "../services/api"

export default function Dashboard() {

  const [stats, setStats] = useState({
    notes: 0,
    flashcards: 0,
    quizzes: 0,
    completedTasks: 0,
    pendingTasks: 0
  })

  const fetchDashboardData = async () => {

    try {

      const notes = await getNotes()

      const flashcards =
        await getFlashcards()

      const quizzes =
        await getQuizzes()

      const tasks =
        await getTasks()

      const completedTasks =
        tasks.filter(
          task => task.completed
        ).length

      const pendingTasks =
        tasks.filter(
          task => !task.completed
        ).length

      setStats({

        notes: notes.length,

        flashcards:
          flashcards.length,

        quizzes:
          quizzes.length,

        completedTasks,

        pendingTasks

      })

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {
    const loadDashboardData = async () => {
      await fetchDashboardData()
    }

    void loadDashboardData()
  }, [])

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Dashboard

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-lg font-semibold">

            Notes

          </h2>

          <p className="text-3xl font-bold mt-2">

            {stats.notes}

          </p>

        </div>

        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-lg font-semibold">

            Flashcards

          </h2>

          <p className="text-3xl font-bold mt-2">

            {stats.flashcards}

          </p>

        </div>

        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-lg font-semibold">

            Quizzes

          </h2>

          <p className="text-3xl font-bold mt-2">

            {stats.quizzes}

          </p>

        </div>

        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-lg font-semibold">

            Completed Tasks

          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">

            {stats.completedTasks}

          </p>

        </div>

        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-lg font-semibold">

            Pending Tasks

          </h2>

          <p className="text-3xl font-bold mt-2 text-red-600">

            {stats.pendingTasks}

          </p>

        </div>

      </div>

    </div>

  )

}