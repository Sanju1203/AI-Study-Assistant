const OpenAI = require("openai")

const Chat =
  require("../models/Chat")

const openai = new OpenAI({

  apiKey:
    process.env.OPENAI_API_KEY

})

/* =========================
   SEND AI MESSAGE
========================= */

const generateAIResponse =
  async (req, res) => {

    try {

      const { message } = req.body

      if (!message) {

        return res.status(400).json({

          message:
            "Message is required"

        })

      }

      const completion =
        await openai.chat.completions.create({

          model: "gpt-3.5-turbo",

          messages: [

            {

              role: "system",

              content:
                "You are an AI Study Assistant helping students."

            },

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

      let chat =
        await Chat.findOne({

          user: req.user._id

        })

      if (!chat) {

        chat =
          await Chat.create({

            user: req.user._id,

            messages: []

          })

      }

      chat.messages.push({

        role: "user",

        content: message

      })

      chat.messages.push({

        role: "assistant",

        content: aiReply

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

      const chat =
        await Chat.findOne({

          user: req.user._id

        })

      if (!chat) {

        return res.json([])

      }

      res.json(chat.messages)

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