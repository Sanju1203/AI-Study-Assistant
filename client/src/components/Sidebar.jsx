import { Link, useLocation } from "react-router-dom"
import {
  FiBookOpen,
  FiCalendar,
  FiCheckSquare,
  FiGrid,
  FiLayers,
  FiMessageCircle,
  FiUser
} from "react-icons/fi"

const menuItems = [
  { name: "Overview", path: "/", icon: FiGrid },
  { name: "My notes", path: "/notes", icon: FiBookOpen },
  { name: "Flashcards", path: "/flashcards", icon: FiLayers },
  { name: "Quizzes", path: "/quiz", icon: FiCheckSquare },
  { name: "Study planner", path: "/planner", icon: FiCalendar },
  { name: "Language tutor", path: "/aichats", icon: FiMessageCircle },
  { name: "Profile", path: "/profile", icon: FiUser }
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="flex min-h-screen w-[72px] shrink-0 flex-col border-r border-slate-200/80 bg-white px-2 py-5 sm:px-3 lg:w-[236px] lg:px-4">
      <Link to="/" className="mb-8 flex items-center justify-center gap-2.5 rounded-xl px-2 py-1.5 lg:justify-start">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-emerald-700 text-xl font-bold text-white shadow-sm">l.</span>
        <span className="hidden text-[17px] font-bold tracking-tight text-slate-800 lg:block">lingua<span className="text-emerald-700">loop</span></span>
      </Link>

      <p className="mb-2 hidden px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 lg:block">Your learning space</p>
      <nav aria-label="Main navigation" className="space-y-1.5">
        {menuItems.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              title={name}
              aria-label={name}
              aria-current={active ? "page" : undefined}
              className={`flex items-center justify-center gap-3 rounded-xl px-2.5 py-3 text-sm font-medium transition-colors lg:justify-start lg:px-3 ${
                active
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Icon className="shrink-0 text-[18px]" aria-hidden="true" />
              <span className="hidden lg:block">{name}</span>
              {active && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-emerald-600 lg:block" />}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto hidden rounded-2xl bg-[#f4f7f3] p-4 lg:block">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">✦</div>
        <p className="text-xs font-semibold text-slate-700">Small steps add up.</p>
        <p className="mt-1 text-[11px] leading-4 text-slate-500">Come back tomorrow and keep your words growing.</p>
      </div>
    </aside>
  )
}
