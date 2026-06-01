import { useState } from "react"
import { registerUser } from "../services/api"

export default function Signup() {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

  })

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const data = await registerUser(formData)

      localStorage.setItem(
        "token",
        data.token
      )

      alert("Signup Successful")

      console.log(data)

    } catch (error) {

      console.log(error)

      alert("Signup Failed")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg"
        >
          Signup
        </button>

      </form>

    </div>

  )

}