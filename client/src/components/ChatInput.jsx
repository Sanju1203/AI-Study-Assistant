import { useState } from "react"
import { FiArrowUp, FiCornerDownLeft } from "react-icons/fi"

export default function ChatInput({ onSend, loading, language, inputRef }) {
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage || loading) return
    onSend(trimmedMessage)
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-50"
    >
      <label className="sr-only" htmlFor="tutor-message">Message your language tutor</label>
      <textarea
        id="tutor-message"
        ref={inputRef}
        rows={1}
        placeholder={`Write a message in ${language.name}...`}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit(event)
          }
        }}
        disabled={loading}
        className="max-h-28 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-60"
      />
      <span className="hidden items-center gap-1 pb-3 text-[10px] text-slate-300 sm:flex">
        <FiCornerDownLeft aria-hidden="true" />
        Enter
      </span>
      <button
        type="submit"
        disabled={loading || !message.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white transition hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        <FiArrowUp className="text-lg" aria-hidden="true" />
      </button>
    </form>
  )
}
