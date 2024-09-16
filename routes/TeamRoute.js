const express = require("express")
const { createTeam, addMembers, getTeams, getAssignee, deleteTeam } = require("../controllers/TeamController")
const {authenticate} = require("../middlewares/Authenticate")

const router = express.Router()

router.route("/addTeam").post(authenticate,createTeam)
router.route("/addMembers/:id").post(addMembers)
router.route("/getTeam").get(authenticate,getTeams)
router.route("/getAssignee/:id").get(getAssignee)
router.route("/deleteTeam/:id").delete(authenticate,deleteTeam)
module.exports = router