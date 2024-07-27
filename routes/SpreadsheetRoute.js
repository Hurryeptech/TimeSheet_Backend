const express = require("express")
const { createSpreadSheet, getSpreadSheet } = require("../controllers/SpreadsheetController")
const {authenticate}= require("../middlewares/Authenticate")
const router = express.Router()

router.route("/addSpreadsheet").post(authenticate,createSpreadSheet)
router.route("/getSpreadsheet").get(authenticate,getSpreadSheet)

module.exports = router