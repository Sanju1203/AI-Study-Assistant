import { useCallback, useEffect, useState } from "react"

import {

  sendAIMessage,
  getChatHistory

} from "../services/api"

import ChatInput
  from "../components/ChatInput"

import ChatWindow
  from "../components/ChatWindow"

export default function AIChats() {

  const [messages, setMessages] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  /* =========================
     FETCH CHAT HISTORY
  ========================= */

  const fetchChatHistory = useCallback(async () => {

    try {

      const data =
        await getChatHistory()

      if (data.length > 0) {

        setMessages(data)

      } else {

        setMessages([

          {

            role: "assistant",

            content:
              "Hello! I am your AI Study Assistant."

          }

        ])

      }

    } catch (error) {

      console.log(error)

    }

  }, [])

  /* =========================
     LOAD CHAT HISTORY
  ========================= */

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChatHistory()

  }, [fetchChatHistory])

  /* =========================
     SEND MESSAGE
  ========================= */

  const handleSendMessage =
    async (message) => {

      const userMessage = {

        role: "user",

        content: message

      }

      setMessages((prev) => [

        ...prev,

        userMessage

      ])

      try {

        setLoading(true)

        const response =
          await sendAIMessage(message)

        const aiMessage = {

          role: "assistant",

          content: response.reply

        }

        setMessages((prev) => [

          ...prev,

          aiMessage

        ])

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)

      }

    }

  return (

    <div className="p-6 space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">

          AI Study Assistant

        </h1>

        <p className="text-gray-500 mt-1">

          Ask questions and learn faster

        </p>

      </div>

      {/* CHAT WINDOW */}

      <ChatWindow
        messages={messages}
      />

      {/* CHAT INPUT */}

      <ChatInput
        onSend={handleSendMessage}
        loading={loading}
      />

    </div>

  )

}