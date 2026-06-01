const Note = require("../models/Note")

// CREATE NOTE
const createNote = async (req, res) => {

  try {

    const { title, content } = req.body

    const note = await Note.create({

      title,
      content,
      user: req.user._id

    })

    res.status(201).json(note)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// GET NOTES
const getNotes = async (req, res) => {

  try {

    const notes = await Note.find({

      user: req.user._id

    })

    res.json(notes)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// UPDATE NOTE
const updateNote = async (req, res) => {

  try {

    const note = await Note.findById(req.params.id)

    if (!note) {

      return res.status(404).json({
        message: "Note not found"
      })

    }

    note.title = req.body.title || note.title

    note.content = req.body.content || note.content

    const updatedNote = await note.save()

    res.json(updatedNote)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

// DELETE NOTE
const deleteNote = async (req, res) => {

  try {

    const note = await Note.findById(req.params.id)

    if (!note) {

      return res.status(404).json({
        message: "Note not found"
      })

    }

    await note.deleteOne()

    res.json({
      message: "Note deleted"
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

}

module.exports = {

  createNote,
  getNotes,
  updateNote,
  deleteNote

}