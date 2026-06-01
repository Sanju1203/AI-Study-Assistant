import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
      <div className="text-lg font-semibold text-gray-800">AI Study Assistant</div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">
              {user.name || user.email || "Member"}
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}