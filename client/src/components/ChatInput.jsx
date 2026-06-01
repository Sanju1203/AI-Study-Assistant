import { useState } from "react"

export default function ChatInput({

  onSend,
  loading

}) {

  const [message, setMessage] =
    useState("")

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!message.trim()) return

    onSend(message)

    setMessage("")

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >

      <input
        type="text"
        placeholder="Ask anything..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        className="flex-1 border p-4 rounded-xl outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-xl"
      >

        {loading
          ? "..."
          : "Send"}

      </button>

    </form>

  )

}