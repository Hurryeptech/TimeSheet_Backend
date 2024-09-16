const express = require("express")
const {  logout, AttendenceAnalysis, AttendenceDetails } = require("../controllers/AttendenceController")
const router = express.Router()
const {authenticate} = require("../middlewares/Authenticate")

// router.route("/user/loginTime").post(authenticate,login)
router.route("/user/logoutTime").put(authenticate,logout)

router.route("/user/attendenceAnalysis").get(authenticate,AttendenceAnalysis)

router.route("/user/getAttendenceDetails").get(authenticate,AttendenceDetails)

module.exports = router