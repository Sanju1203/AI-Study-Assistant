import { useCallback, useEffect, useState } from "react"

import {

  createTask,
  getTasks,
  updateTask,
  deleteTask

} from "../services/api"

import PlannerForm from "../components/PlannerForm"

import PlannerList from "../components/PlannerList"

export default function Planner() {

  const [tasks, setTasks] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      deadline: ""

    })

  /* =========================
     FETCH TASKS
  ========================= */

  const fetchTasks = useCallback(async () => {

    try {

      const data = await getTasks()

      setTasks(data)

    } catch (error) {

      console.error(error)

    }

  }, [])

  useEffect(() => {

    let isMounted = true

    const loadTasks = async () => {

      try {

        const data = await getTasks()

        if (isMounted) {

          setTasks(data)

        }

      } catch (error) {

        console.error(error)

      }

    }

    void loadTasks()

    return () => {

      isMounted = false

    }

  }, [fetchTasks])

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })

  }

  /* =========================
     CREATE / UPDATE
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      // UPDATE
      if (editingId) {

        await updateTask(

          editingId,

          formData

        )

        setEditingId(null)

      }

      // CREATE
      else {

        await createTask(formData)

      }

      // RESET
      setFormData({

        title: "",
        description: "",
        deadline: ""

      })

      fetchTasks()

    } catch (error) {

      console.log(error)

    }

  }

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {

    try {

      await deleteTask(id)

      fetchTasks()

    } catch (error) {

      console.log(error)

    }

  }

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (task) => {

    setEditingId(task._id)

    setFormData({

      title: task.title,

      description: task.description,

      deadline:
        task.deadline.split("T")[0]

    })

  }

  /* =========================
     TOGGLE COMPLETE
  ========================= */

  const handleToggleComplete =
    async (task) => {

      try {

        await updateTask(

          task._id,

          {

            ...task,

            completed:
              !task.completed

          }

        )

        fetchTasks()

      } catch (error) {

        console.log(error)

      }

    }

  return (

    <div className="p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Study Planner
        </h1>

        <p className="text-gray-500 mt-1">
          Organize your study tasks
        </p>

      </div>

      <PlannerForm

        formData={formData}

        handleChange={handleChange}

        handleSubmit={handleSubmit}

        editingId={editingId}

      />

      <PlannerList

        tasks={tasks}

        onEdit={handleEdit}

        onDelete={handleDelete}

        onToggleComplete={
          handleToggleComplete
        }

      />

    </div>

  )

}