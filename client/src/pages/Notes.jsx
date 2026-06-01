import { useEffect, useState } from "react"

import {

  createNote,
  getNotes,
  updateNote,
  deleteNote

} from "../services/api"

export default function Notes() {

  const [notes, setNotes] =
    useState([])

  const [searchTerm, setSearchTerm] =
    useState("")

  const [title, setTitle] =
    useState("")

  const [content, setContent] =
    useState("")

  const [editingId, setEditingId] =
    useState(null)

  const fetchNotes = async () => {

    try {

      const data =
        await getNotes()

      setNotes(data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {
    const loadNotes = async () => {
      await fetchNotes()
    }

    void loadNotes()
  }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      if (editingId) {

        await updateNote(

          editingId,

          {

            title,
            content

          }

        )

        setEditingId(null)

      } else {

        await createNote({

          title,
          content

        })

      }

      setTitle("")
      setContent("")

      fetchNotes()

    } catch (error) {

      console.log(error)

    }

  }

  const handleEdit = (note) => {

    setEditingId(note._id)

    setTitle(note.title)

    setContent(note.content)

  }

  const handleDelete = async (id) => {

    try {

      await deleteNote(id)

      fetchNotes()

    } catch (error) {

      console.log(error)

    }

  }

  const filteredNotes =
    notes.filter((note) =>

      note.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||

      note.content
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    )

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">

        Notes

      </h1>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-6"
      />

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full border p-3 rounded-lg h-32"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        >

          {editingId

            ? "Update Note"

            : "Add Note"}

        </button>

      </form>

      {/* NOTES */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {filteredNotes.map((note) => (

          <div
            key={note._id}
            className="bg-white p-5 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold">

              {note.title}

            </h2>

            <p className="mt-3">

              {note.content}

            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  handleEdit(note)
                }
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >

                Edit

              </button>

              <button
                onClick={() =>
                  handleDelete(note._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >

                Delete

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}