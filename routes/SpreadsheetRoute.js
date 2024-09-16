const express = require("express")
const { getSpreadSheet, remainder } = require("../controllers/SpreadsheetController")
const {authenticate}= require("../middlewares/Authenticate")
const router = express.Router()

// router.route("/addSpreadsheet").post(authenticate,createSpreadSheet)
router.route("/getSpreadsheet").get(authenticate,getSpreadSheet)
router.route("/sendRemainder").post(authenticate,remainder)

module.exports = router