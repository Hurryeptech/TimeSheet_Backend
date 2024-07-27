const express = require("express")
const { addEvent, getAllEvent } = require("../controllers/EventController")
const {authenticate} = require("../middlewares/Authenticate")

const router = express.Router()

router.route("/event/addEvent").post(authenticate,addEvent)
router.route("/event/getAllEvent").get(authenticate,getAllEvent)

module.exports = router