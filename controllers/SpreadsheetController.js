const CatchAsyncError = require("../middlewares/CatchAsyncError")
const SpreadsheetModel = require("../models/SpreadsheetModel")
const UserModel = require("../models/UserModel")
const ErrorHandler = require("../utils/ErrorHandler")

exports.createSpreadSheet = CatchAsyncError(async(req,res,next)=>{

    const { data } = req.body;
    console.log(req.body)
 const spreadsheets = await SpreadsheetModel.create({})
  res.send("Spreadsheet saved successfully!");
})

exports.getSpreadSheet = CatchAsyncError(async(req,res)=>{

    const spreadsheets = await SpreadsheetModel.find();
    res.json(spreadsheets);
})