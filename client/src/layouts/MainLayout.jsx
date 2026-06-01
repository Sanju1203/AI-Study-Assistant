import Sidebar from "../components/Sidebar"

import Navbar from "../components/Navbar"

export default function MainLayout({ children }) {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  )

}