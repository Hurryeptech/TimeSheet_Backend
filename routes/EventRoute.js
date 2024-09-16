const express = require("express")
const { addEvent, getAllEvent, updateEvents, deleteEvent } = require("../controllers/EventController")
const {authenticate} = require("../middlewares/Authenticate")

const router = express.Router()

router.route("/event/addEvent").post(authenticate,addEvent)
router.route("/event/getAllEvent").get(authenticate,getAllEvent)
router.route("/event/updateEvent/:event_id").put(authenticate,updateEvents)
router.route("/event/deleteEvent/:event_id").delete(authenticate,deleteEvent)

module.exports = router