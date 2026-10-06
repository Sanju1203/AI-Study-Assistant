import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#fbfcfa]">
      <Sidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
