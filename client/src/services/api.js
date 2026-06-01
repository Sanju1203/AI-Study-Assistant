import axios from "axios"

/* =========================
   AXIOS INSTANCE
========================= */

const API = axios.create({

  baseURL: "http://localhost:5001/api"

})

/* =========================
   TOKEN CONFIG
========================= */

const getTokenConfig = () => {

  const token = localStorage.getItem("token")

  return {

    headers: {

      Authorization: `Bearer ${token}`

    }

  }

}

/* =========================
   AUTH APIs
========================= */

// REGISTER
export const registerUser = async (
  userData
) => {

  const response = await API.post(

    "/auth/register",

    userData

  )

  return response.data

}

// LOGIN
export const loginUser = async (
  userData
) => {

  const response = await API.post(

    "/auth/login",

    userData

  )

  return response.data

}

/* =========================
   NOTES APIs
========================= */

// CREATE NOTE
export const createNote = async (
  noteData
) => {

  const response = await API.post(

    "/notes",

    noteData,

    getTokenConfig()

  )

  return response.data

}

// GET NOTES
export const getNotes = async () => {

  const response = await API.get(

    "/notes",

    getTokenConfig()

  )

  return response.data

}

// UPDATE NOTE
export const updateNote = async (
  id,
  noteData
) => {

  const response = await API.put(

    `/notes/${id}`,

    noteData,

    getTokenConfig()

  )

  return response.data

}

// DELETE NOTE
export const deleteNote = async (id) => {

  const response = await API.delete(

    `/notes/${id}`,

    getTokenConfig()

  )

  return response.data

}

/* =========================
   FLASHCARD APIs
========================= */

// CREATE FLASHCARD
export const createFlashcard =
  async (flashcardData) => {

    const response = await API.post(

      "/flashcards",

      flashcardData,

      getTokenConfig()

    )

    return response.data

  }

// GET FLASHCARDS
export const getFlashcards =
  async () => {

    const response = await API.get(

      "/flashcards",

      getTokenConfig()

    )

    return response.data

  }

// UPDATE FLASHCARD
export const updateFlashcard =
  async (id, flashcardData) => {

    const response = await API.put(

      `/flashcards/${id}`,

      flashcardData,

      getTokenConfig()

    )

    return response.data

  }

// DELETE FLASHCARD
export const deleteFlashcard =
  async (id) => {

    const response = await API.delete(

      `/flashcards/${id}`,

      getTokenConfig()

    )

    return response.data

  }

/* =========================
   QUIZ APIs
========================= */

// CREATE QUIZ
export const createQuiz = async (
  quizData
) => {

  const response = await API.post(

    "/quizzes",

    quizData,

    getTokenConfig()

  )

  return response.data

}

// GET QUIZZES
export const getQuizzes = async () => {

  const response = await API.get(

    "/quizzes",

    getTokenConfig()

  )

  return response.data

}

// UPDATE QUIZ
export const updateQuiz = async (
  id,
  quizData
) => {

  const response = await API.put(

    `/quizzes/${id}`,

    quizData,

    getTokenConfig()

  )

  return response.data

}

// DELETE QUIZ
export const deleteQuiz = async (
  id
) => {

  const response = await API.delete(

    `/quizzes/${id}`,

    getTokenConfig()

  )

  return response.data

}

/* =========================
   PLANNER APIs
========================= */

// CREATE TASK
export const createTask = async (
  taskData
) => {

  const response = await API.post(

    "/planner",

    taskData,

    getTokenConfig()

  )

  return response.data

}

// GET TASKS
export const getTasks = async () => {

  const response = await API.get(

    "/planner",

    getTokenConfig()

  )

  return response.data

}

// UPDATE TASK
export const updateTask = async (
  id,
  taskData
) => {

  const response = await API.put(

    `/planner/${id}`,

    taskData,

    getTokenConfig()

  )

  return response.data

}

// DELETE TASK
export const deleteTask = async (
  id
) => {

  const response = await API.delete(

    `/planner/${id}`,

    getTokenConfig()

  )

  return response.data

}

/* =========================
   AI APIs
========================= */

// SEND AI MESSAGE
export const sendAIMessage =
  async (message) => {

    const response = await API.post(

      "/ai/chat",

      { message },

      getTokenConfig()

    )

    return response.data

  }

// GET CHAT HISTORY
export const getChatHistory =
  async () => {

    const response = await API.get(

      "/ai/history",

      getTokenConfig()

    )

    return response.data

  }

export default API