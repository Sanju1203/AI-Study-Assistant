const mongoose = require("mongoose")

const messageSchema =
  new mongoose.Schema({

    role: {

      type: String,

      required: true

    },

    content: {

      type: String,

      required: true

    }

  })

const chatSchema =
  new mongoose.Schema({

    user: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User"

    },

    messages: [messageSchema]

  }, {

    timestamps: true

  })

module.exports =
  mongoose.model(
    "Chat",
    chatSchema
  )