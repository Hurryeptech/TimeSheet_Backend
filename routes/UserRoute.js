const express = require("express")
const { signup, signin, verifyOtp, viewProfile } = require("../controllers/UserController")
const {authenticate} = require("../middlewares/Authenticate")
const router = express.Router()


router.route("/user/signup").post(signup)
router.route("/user/signin").post(signin)
router.route("/user/verifyOtp").post(verifyOtp)
router.route("/user/viewProfile").get(authenticate,viewProfile)

module.exports = router