const express = require("express")
const { login, logout } = require("../controllers/AttendenceController")
const router = express.Router()
const {authenticate} = require("../middlewares/Authenticate")

router.route("/user/loginTime").post(authenticate,login)
router.route("/user/logoutTime").post(logout)

module.exports = router