import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { FiVolume2 } from "react-icons/fi"

export default function ChatMessage({ role, content, language }) {
  const isUser = role === "user"

  const speakMessage = () => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(content)
    utterance.lang = language.code
    window.speechSynthesis.speak(utterance)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-2.5 sm:gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-800" aria-label={`${language.name} tutor`}>
          ✦
        </span>
      )}
      <div className={`max-w-[88%] sm:max-w-[78%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 sm:px-5 sm:py-4 ${
            isUser
              ? "rounded-br-md bg-emerald-700 text-white"
              : "rounded-tl-md bg-slate-100 text-slate-700"
          }`}
        >
          <div className="tutor-markdown">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        {!isUser && (
          <button
            type="button"
            onClick={speakMessage}
            aria-label="Listen to tutor message"
            className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <FiVolume2 aria-hidden="true" />
            Listen
          </button>
        )}
      </div>
      {isUser && (
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f6e8d8] text-xs font-bold text-[#916341]" aria-label="You">
          You
        </span>
      )}
    </motion.div>
  )
}
