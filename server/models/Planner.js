const mongoose = require("mongoose")

const plannerSchema = new mongoose.Schema({

  title: {

    type: String,
    required: true

  },

  description: {

    type: String,
    required: true

  },

  deadline: {

    type: Date,
    required: true

  },

  completed: {

    type: Boolean,
    default: false

  },

  user: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "User"

  }

}, {

  timestamps: true

})

module.exports = mongoose.model(
  "Planner",
  plannerSchema
)