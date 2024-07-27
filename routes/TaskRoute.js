const express = require("express")
const { addTask, getAllTasks } = require("../controllers/TaskController")
const router = express.Router()

router.route("/tasks/addTask").post(addTask)
router.route("/tasks/getAllTasks").get(getAllTasks)

module.exports = router