import { useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import { useAuth } from "../hooks/useAuth"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const displayName = user?.name || user?.email || "Learner"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-200/70 bg-[#fbfcfa] px-4 sm:px-6 lg:px-9">
      <div className="app-header-copy">
        <p className="text-xs font-medium text-slate-400">A little progress, every day</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-700">Make room for a new word.</p>
      </div>
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4e8dc] text-xs font-bold text-[#916341]" aria-hidden="true">
          {displayName.slice(0, 1).toUpperCase()}
        </span>
        <span className="hidden max-w-36 truncate text-sm font-medium text-slate-600 sm:block">{displayName}</span>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          title="Log out"
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <FiLogOut aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
