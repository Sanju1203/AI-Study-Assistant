const express =
  require("express")

const router =
  express.Router()

const protect =
  require("../middleware/authMiddleware")

const {

  generateAIResponse,

  getChatHistory

} = require("../controllers/aiController")

router.post(

  "/chat",

  protect,

  generateAIResponse

)

router.get(

  "/history",

  protect,

  getChatHistory

)

module.exports = router