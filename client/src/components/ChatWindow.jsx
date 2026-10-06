import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ChatMessage from "./ChatMessage"

export default function ChatWindow({ messages, loading, language }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, loading])

  return (
    <div
      aria-live="polite"
      aria-label={`${language.name} conversation`}
      className="tutor-scroll min-h-0 space-y-5 overflow-y-auto px-4 py-6 sm:px-6 sm:py-7"
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <ChatMessage
            key={`${index}-${message.role}`}
            role={message.role}
            content={message.content}
            language={language}
          />
        ))}
      </AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5"
          role="status"
          aria-label="Tutor is thinking"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm">✦</span>
          <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-emerald-600"
                animate={{ y: [0, -4, 0], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.14 }}
              />
            ))}
          </div>
        </motion.div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
