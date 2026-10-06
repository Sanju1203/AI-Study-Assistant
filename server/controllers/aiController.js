const OpenAI = require("openai")

const Chat =
  require("../models/Chat")

const openai = new OpenAI({

  apiKey:
    process.env.OPENAI_API_KEY

})

const supportedLanguages = [
  "Spanish",
  "French",
  "Japanese",
  "Italian",
  "German",
  "Korean",
  "Portuguese",
  "Mandarin Chinese"
]

const supportedLevels = [
  "Beginner",
  "Elementary",
  "Intermediate",
  "Advanced"
]

const supportedModes = [
  "Conversation",
  "Vocabulary",
  "Grammar",
  "Speaking"
]

/* =========================
   SEND AI MESSAGE
========================= */

const generateAIResponse =
  async (req, res) => {

    try {

      const {
        message,
        language = "Spanish",
        level = "Beginner",
        mode = "Conversation"
      } = req.body

      if (typeof message !== "string" || !message.trim()) {

        return res.status(400).json({

          message:
            "Message is required"

        })

      }

      if (
        !supportedLanguages.includes(language) ||
        !supportedLevels.includes(level) ||
        !supportedModes.includes(mode)
      ) {
        return res.status(400).json({
          message: "Unsupported language learning settings"
        })
      }

      let chat =
        await Chat.findOne({

          user: req.user._id

        })

      const conversationHistory = chat
        ? chat.messages
          .filter((entry) =>
            entry.language === language &&
            (entry.role === "user" || entry.role === "assistant")
          )
          .slice(-20)
          .map((entry) => ({
            role: entry.role,
            content: entry.content
          }))
        : []

      const completion =
        await openai.chat.completions.create({

          model: "gpt-3.5-turbo",

          messages: [

            {

              role: "system",

              content: `You are a warm, patient language tutor. Help the learner practice ${language} at a ${level} level through ${mode.toLowerCase()}.

Respond primarily in ${language}, using concise English explanations when useful for this learner's level. Keep the conversation encouraging and interactive: ask one natural follow-up question at a time, and invite the learner to reply in ${language}. Gently correct mistakes by showing the improved version and briefly explaining why. For new vocabulary, include a simple pronunciation guide and an example. Adapt the lesson to the learner's message rather than giving an unrelated lecture.`

            },

            ...conversationHistory,

            {

              role: "user",

              content: message

            }

          ]

        })

      const aiReply =
        completion.choices[0]
          .message.content

      /* =========================
         SAVE CHAT
      ========================= */

      if (!chat) {

        chat =
          await Chat.create({

            user: req.user._id,

            messages: []

          })

      }

      chat.messages.push({

        role: "user",

        content: message,

        language

      })

      chat.messages.push({

        role: "assistant",

        content: aiReply,

        language

      })

      await chat.save()

      res.json({

        reply: aiReply

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        message:
          "AI request failed"

      })

    }

  }

/* =========================
   GET CHAT HISTORY
========================= */

const getChatHistory =
  async (req, res) => {

    try {

      const language = req.query.language

      if (language && !supportedLanguages.includes(language)) {
        return res.status(400).json({
          message: "Unsupported language"
        })
      }

      const chat =
        await Chat.findOne({

          user: req.user._id

        })

      if (!chat) {

        return res.json([])

      }

      const messages = language
        ? chat.messages.filter((message) => message.language === language)
        : chat.messages

      res.json(messages)

    } catch (error) {

      console.log(error)

      res.status(500).json({

        message:
          "Failed to load chat"

      })

    }

  }

module.exports = {

  generateAIResponse,

  getChatHistory

}