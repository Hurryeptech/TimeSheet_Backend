const CatchAsyncError = require("../middlewares/CatchAsyncError")
const SpreadsheetModel = require("../models/SpreadsheetModel")
const UserModel = require("../models/UserModel")
const ErrorHandler = require("../utils/ErrorHandler")
const sendMail = require("../utils/SendEmail")

// exports.createSpreadSheet = CatchAsyncError(async(req,res,next)=>{

//     const {date,client,assignee, subject, details, status,userEmail } = req.body;
//     const user = await UserModel.findOne({userEmail: userEmail})

//  const spreadsheets = await SpreadsheetModel.create({
//     date: date, client: client, assignee: assignee, subject: subject, details: details, status: status,
//     user: user.id
//  })
//   res.send("Spreadsheet saved successfully!");
// })

exports.getSpreadSheet = CatchAsyncError(async(req,res)=>{

    const {id} = req.user
    
    const spreadsheets = await SpreadsheetModel.find({user: id});
    res.json(spreadsheets);
})

exports.remainder = CatchAsyncError(async(req,res,next)=>{

    const userEmail = req.user.userEmail

    const options ={
        to: "jannathmarha23@gmail.com",
        subject: "Spreadsheet Ready for Download",
        message:
          "The spreadsheet is ready for download. Please download it now.",
    }

    const mail = sendMail(options)

    if(!mail)
    {
        return next(new ErrorHandler("Error In Sending Mail",500))
    }
    res.status(200).json({
        success: true,
        message: "Mail Sent Successfully"
    })

})