import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiMessageCircle,
  FiMic,
  FiRefreshCw,
  FiStar,
  FiVolume2
} from "react-icons/fi"
import { getChatHistory, sendAIMessage } from "../services/api"
import ChatInput from "../components/ChatInput"
import ChatWindow from "../components/ChatWindow"

const languages = [
  { name: "Spanish", flag: "🇪🇸", code: "es-ES", greeting: "¡Hola! I'm Sol, your Spanish tutor." },
  { name: "French", flag: "🇫🇷", code: "fr-FR", greeting: "Bonjour ! I'm Camille, your French tutor." },
  { name: "Japanese", flag: "🇯🇵", code: "ja-JP", greeting: "こんにちは! I'm Hana, your Japanese tutor." },
  { name: "Italian", flag: "🇮🇹", code: "it-IT", greeting: "Ciao! I'm Luca, your Italian tutor." },
  { name: "German", flag: "🇩🇪", code: "de-DE", greeting: "Hallo! I'm Mia, your German tutor." },
  { name: "Korean", flag: "🇰🇷", code: "ko-KR", greeting: "안녕하세요! I'm Min, your Korean tutor." },
  { name: "Portuguese", flag: "🇧🇷", code: "pt-BR", greeting: "Olá! I'm Luísa, your Portuguese tutor." },
  { name: "Mandarin Chinese", flag: "🇨🇳", code: "zh-CN", greeting: "你好! I'm Lin, your Mandarin tutor." }
]

const levels = ["Beginner", "Elementary", "Intermediate", "Advanced"]
const modes = [
  { name: "Conversation", icon: FiMessageCircle, prompt: "Let's practice a conversation" },
  { name: "Vocabulary", icon: FiBookOpen, prompt: "Teach me five useful words for everyday life" },
  { name: "Grammar", icon: FiCheck, prompt: "Give me a quick grammar lesson with examples" },
  { name: "Speaking", icon: FiMic, prompt: "Help me practice speaking with a short roleplay" }
]

const dailyPhrases = {
  Spanish: { phrase: "¿Qué tal?", pronunciation: "keh tal", meaning: "How's it going?", note: "A relaxed, friendly way to ask someone how they are." },
  French: { phrase: "Ça va ?", pronunciation: "sah vah", meaning: "How are you?", note: "A casual greeting you'll hear all the time in France." },
  Japanese: { phrase: "元気ですか？", pronunciation: "genki desu ka", meaning: "How are you?", note: "A friendly way to ask someone how they are doing." },
  Italian: { phrase: "Come va?", pronunciation: "koh-meh vah", meaning: "How's it going?", note: "A warm, casual greeting for friends and new acquaintances." },
  German: { phrase: "Wie geht's?", pronunciation: "vee gayts", meaning: "How's it going?", note: "A common, informal way to check in with someone." },
  Korean: { phrase: "잘 지내요?", pronunciation: "jal jinaeyo", meaning: "Are you doing well?", note: "A friendly, polite way to ask how someone is doing." },
  Portuguese: { phrase: "Tudo bem?", pronunciation: "too-doo beng", meaning: "All good?", note: "A common, easygoing greeting in Brazil and Portugal." },
  "Mandarin Chinese": { phrase: "你好吗？", pronunciation: "nǐ hǎo ma", meaning: "How are you?", note: "A friendly question to add after saying hello." }
}

const getWelcomeMessage = (language) => ({
  role: "assistant",
  content: `${language.greeting}\n\nI'm here to help you learn through **real conversation**. Make mistakes, ask questions, and we'll figure it out together.\n\nTo get started, tell me a little about yourself in ${language.name} — or pick a prompt below!`
})

export default function AIChats() {
  const [languageName, setLanguageName] = useState(
    () => localStorage.getItem("tutorLanguage") || "Spanish"
  )
  const [level, setLevel] = useState("Beginner")
  const [mode, setMode] = useState("Conversation")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [levelMenuOpen, setLevelMenuOpen] = useState(false)
  const language = languages.find((item) => item.name === languageName) || languages[0]
  const composerRef = useRef(null)
  const phrase = dailyPhrases[language.name]

  const fetchChatHistory = useCallback(async () => {
    try {
      const history = await getChatHistory(language.name)
      setMessages(history.length ? history : [getWelcomeMessage(language)])
    } catch {
      setMessages([getWelcomeMessage(language)])
      setError("Your chat history is offline. You can still start a new lesson.")
    }
  }, [language])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChatHistory()
  }, [fetchChatHistory])

  const handleLanguageChange = (selectedLanguage) => {
    setLanguageName(selectedLanguage.name)
    localStorage.setItem("tutorLanguage", selectedLanguage.name)
    setLanguageMenuOpen(false)
    setMessages([getWelcomeMessage(selectedLanguage)])
    setError("")
  }

  const handleSendMessage = async (message, activeMode = mode) => {
    setMessages((current) => [...current, { role: "user", content: message }])
    setError("")
    setLoading(true)

    try {
      const response = await sendAIMessage(message, {
        language: language.name,
        level,
        mode: activeMode
      })
      setMessages((current) => [...current, { role: "assistant", content: response.reply }])
    } catch {
      setError("We couldn't reach your tutor. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const startPrompt = (prompt, activeMode = mode) => {
    handleSendMessage(prompt, activeMode)
    composerRef.current?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-5 sm:px-6 lg:px-9 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            <FiStar aria-hidden="true" />
            Your daily language practice
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.15rem]">
            Learn by <span className="font-serif italic text-emerald-700">speaking.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            A friendly conversation is the best place to find your words.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-medium">Your tutor is ready</span>
        </div>
      </motion.div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_16px_50px_-28px_rgba(15,23,42,0.23)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
            <div className="relative">
              <button
                type="button"
                aria-expanded={languageMenuOpen}
                onClick={() => {
                  setLanguageMenuOpen((open) => !open)
                  setLevelMenuOpen(false)
                }}
                className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span className="text-2xl" aria-hidden="true">{language.flag}</span>
                <span>
                  <span className="block text-sm font-bold text-slate-800">{language.name}</span>
                  <span className="block text-xs text-slate-400">Learning language</span>
                </span>
                <FiChevronDown className="ml-1 text-slate-400" aria-hidden="true" />
              </button>
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    className="absolute left-0 top-full z-20 mt-2 max-h-72 w-64 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
                  >
                    {languages.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => handleLanguageChange(option)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                          option.name === language.name
                            ? "bg-emerald-50 font-semibold text-emerald-800"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xl" aria-hidden="true">{option.flag}</span>
                        {option.name}
                        {option.name === language.name && <FiCheck className="ml-auto" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-medium text-slate-400 sm:block">YOUR LEVEL</span>
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={levelMenuOpen}
                  onClick={() => {
                    setLevelMenuOpen((open) => !open)
                    setLanguageMenuOpen(false)
                  }}
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {level}
                  <FiChevronDown aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {levelMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full z-20 mt-2 w-40 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl"
                    >
                      {levels.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setLevel(option)
                            setLevelMenuOpen(false)
                          }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                            level === option
                              ? "bg-emerald-50 font-semibold text-emerald-800"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid min-h-[510px] grid-rows-[1fr_auto] sm:min-h-[570px]">
            <ChatWindow messages={messages} loading={loading} language={language} />
            <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-3 sm:px-6 sm:pb-5">
              {error && (
                <div role="status" className="mb-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  <FiRefreshCw aria-hidden="true" />
                  {error}
                </div>
              )}
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {modes.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setMode(name)}
                    aria-pressed={mode === name}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      mode === name
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <Icon aria-hidden="true" />
                    {name}
                  </button>
                ))}
              </div>
              <ChatInput
                inputRef={composerRef}
                onSend={handleSendMessage}
                loading={loading}
                language={language}
              />
              <p className="mt-2 text-center text-[11px] text-slate-400">
                Your AI tutor can make mistakes. Keep asking questions and have fun learning.
              </p>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#163b32] p-5 text-white shadow-lg shadow-emerald-950/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/70">A little language</p>
                <h2 className="mt-1 text-lg font-semibold">Phrase of the day</h2>
              </div>
              <span className="rounded-xl bg-white/10 p-2.5 text-emerald-100"><FiVolume2 aria-hidden="true" /></span>
            </div>
            <p className="mt-6 font-serif text-3xl tracking-wide">{phrase.phrase}</p>
            <p className="mt-1 text-sm text-emerald-100/75">{phrase.pronunciation}</p>
            <div className="my-4 h-px bg-white/15" />
            <p className="text-sm text-white/85">“{phrase.meaning}”</p>
            <p className="mt-2 text-xs leading-5 text-emerald-100/60">{phrase.note}</p>
            <button
              type="button"
              onClick={() => {
                if ("speechSynthesis" in window) {
                  window.speechSynthesis.cancel()
                  const utterance = new SpeechSynthesisUtterance(phrase.phrase)
                  utterance.lang = language.code
                  window.speechSynthesis.speak(utterance)
                }
              }}
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-emerald-200 transition hover:text-white focus:outline-none focus-visible:underline"
            >
              <FiVolume2 aria-hidden="true" />
              Hear pronunciation
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="rounded-xl bg-amber-50 p-2.5 text-amber-600"><FiClock aria-hidden="true" /></span>
                <h2 className="text-sm font-bold text-slate-800">Make it a habit</h2>
              </div>
              <span className="text-lg" aria-hidden="true">🌱</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Just a few minutes of conversation each day can take you somewhere new.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-600">Today is a great day to start</span>
            </div>
          </div>

          <div>
            <p className="mb-2 px-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">Try saying</p>
            <div className="space-y-2">
              {modes
                .filter(({ name }) => name !== mode)
                .slice(0, 3)
                .map(({ name, prompt }) => (
                  <button
                    key={name}
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setMode(name)
                      startPrompt(prompt, name)
                    }}
                    className="group flex w-full items-center justify-between rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 text-left text-xs text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md disabled:opacity-50"
                  >
                    <span className="pr-3">“{prompt}”</span>
                    <FiArrowRight className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-600" aria-hidden="true" />
                  </button>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
