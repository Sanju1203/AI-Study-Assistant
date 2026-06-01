const Planner = require("../models/Planner")

// CREATE TASK
const createTask = async (req, res) => {

  try {

    const {

      title,
      description,
      deadline

    } = req.body

    const task = await Planner.create({

      title,
      description,
      deadline,
      user: req.user._id

    })

    res.status(201).json(task)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// GET TASKS
const getTasks = async (req, res) => {

  try {

    const tasks = await Planner.find({

      user: req.user._id

    }).sort({

      deadline: 1

    })

    res.json(tasks)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// UPDATE TASK
const updateTask = async (req, res) => {

  try {

    const task = await Planner.findById(req.params.id)

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      })

    }

    task.title =
      req.body.title || task.title

    task.description =
      req.body.description || task.description

    task.deadline =
      req.body.deadline || task.deadline

    if (
      req.body.completed !== undefined
    ) {

      task.completed =
        req.body.completed

    }

    const updatedTask =
      await task.save()

    res.json(updatedTask)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// DELETE TASK
const deleteTask = async (req, res) => {

  try {

    const task = await Planner.findById(req.params.id)

    if (!task) {

      return res.status(404).json({
        message: "Task not found"
      })

    }

    await task.deleteOne()

    res.json({
      message: "Task deleted"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {

  createTask,
  getTasks,
  updateTask,
  deleteTask

}