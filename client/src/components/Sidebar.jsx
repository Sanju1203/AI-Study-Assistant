import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {

  const location = useLocation()

  const menuItems = [

    {
      name: "Dashboard",
      path: "/"
    },

    {
      name: "Notes",
      path: "/notes"
    },

    {
      name: "Flashcards",
      path: "/flashcards"
    },

    {
      name: "Quiz",
      path: "/quiz"
    },

    {
      name: "Planner",
      path: "/planner"
    },

    {
      name: "AI Chat",
      path: "/aichats"
    },

    {
      name: "Profile",
      path: "/profile"
    }

  ]

  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-10">
        Study App
      </h1>

      {/* MENU */}

      <div className="space-y-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-xl transition

              ${
                location.pathname === item.path

                  ? "bg-blue-500"

                  : "hover:bg-gray-800"
              }
            `}
          >

            {item.name}

          </Link>

        ))}

      </div>

    </div>

  )

}