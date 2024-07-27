const CatchAsyncError = require("../middlewares/CatchAsyncError")
const AttendenceModel = require("../models/AttendenceModel")
const ErrorHandler = require("../utils/ErrorHandler")

exports.login = CatchAsyncError(async(req,res,next)=>{

    const{date,time} = req.body

    const loginTime = await AttendenceModel.create({
        date: date,
        time: time,
        user: req.user.id
    })

    if(!loginTime)
    {
        return next(new ErrorHandler("Some error in adding login time",500))
    }

    res.status(201).json({
        success: true,
        message: "Login time added"
    })
})

exports.logout = CatchAsyncError(async(req,res,next)=>{

    const {date,logoutTime} = req.body

    const logoutUser = await AttendenceModel.findOne({date: date})

    if(!logoutUser)
    {
        return next(new ErrorHandler("Log in First to logout",400))
    }

    logoutUser.logoutTime = logoutTime
    await logoutUser.save()
    console.log(logoutTime)

    res.status(201).json({
        success: true,
        message: "Logout time added",
        logoutUser
    })
})
