import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { loginUser } from "../services/api"

import { useAuth } from "../hooks/useAuth"

export default function Login() {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [formData, setFormData] = useState({

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

      const data = await loginUser(formData)

      // Save user and token using Context API
      login(data.user, data.token)

      alert("Login Successful")

      // Redirect to Dashboard
      navigate("/")

    } catch (error) {

      console.log(error)

      alert("Invalid Email or Password")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-center text-gray-500">

          Don't have an account?

          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer ml-2"
          >
            Signup
          </span>

        </p>

      </form>

    </div>

  )

}