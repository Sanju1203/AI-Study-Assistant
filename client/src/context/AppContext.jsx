import { createContext, useContext, useState } from "react"

const AppContext = createContext()

export function AppProvider({ children }) {

  const [notes, setNotes] = useState([])

  const [tasks, setTasks] = useState([])

  const [user, setUser] = useState({
    name: "Sanju",
    streak: 12
  })

  return (
    <AppContext.Provider
      value={{
        notes,
        setNotes,
        tasks,
        setTasks,
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}