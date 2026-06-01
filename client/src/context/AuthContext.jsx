import { useState } from "react"
import { AuthContext } from "./AuthContextValue"

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  // LOGIN
  const login = (userData, token) => {

    localStorage.setItem(
      "token",
      token
    )

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    )

    setUser(userData)

  }

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("user")

    setUser(null)

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}