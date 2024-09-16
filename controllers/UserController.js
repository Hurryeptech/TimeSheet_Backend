const CatchAsyncError = require("../middlewares/CatchAsyncError")
const userModel = require("../models/UserModel")
const ErrorHandler = require("../utils/ErrorHandler")
const otplib = require("otplib")
const sendMail = require("../utils/SendEmail")
const SendToken = require("../utils/SendToken")
const AttendenceModel = require("../models/AttendenceModel")
const moment = require("moment")
const HolidayModel = require("../models/HolidayModel")
const cloudinary = require("../utils/Cloudinary")
const fs = require("fs-extra")
const LeaveModel = require("../models/LeaveModel")
const AnnouncementModel = require("../models/AnnouncementModel")
const SpreadsheetModel = require("../models/SpreadsheetModel")

exports.sendMailNew = CatchAsyncError(async(req,res)=>{

    const {userEmail} = req.body
    otplib.totp.options= {digits: 4,step: 120}
    const otp = otplib.totp.generate(userEmail+process.env.OTPLIB_SECRET)
    // sendMail()

    res.status(200).json({
        otp
    })
})

exports.signup = CatchAsyncError(async(req,res,next)=>{

    const {userName,userEmail,dob,position,mobile,otp,department,address} = req.body

    const verify = otplib.totp.check(otp,userEmail+process.env.OTPLIB_SECRET)
    if(!verify)
    {
        return next(new ErrorHandler("Incorrect Otp",401))
    }

    const imagePath = req.file.path

    const cloud = await cloudinary.uploader.upload(imagePath,{folder: 'profile'})
    const user = await userModel.create({
        userName,
        userEmail,
        dob,
        position,
        mobile,
        image: cloud.url,
        department,
        address
    },)
    
    if(!user)
    {
        return next(new ErrorHandler("Problem in Creating User",500))
    }

fs.remove(imagePath, err => {
  if (err) return console.error(err)
  console.log('profile Deleted!')
})

    res.status(201).json({
        success: true,
        message: "User Created",
        user
    })
})

exports.signin = CatchAsyncError(async(req,res,next)=>{

    const {userEmail} = req.body
 

    const validUser = await userModel.findOne({userEmail: userEmail})

  
    if(!validUser)
    {
        return next(new ErrorHandler("Not a Valid User",401))
    }

    otplib.totp.options= {digits: 4,step: 120}
    const otp = otplib.totp.generate(userEmail+process.env.OTPLIB_SECRET)


// const options = {
//         to: validUser.userEmail,
//         html: `<p> Verify Your Otp ${otp}`,
//         subject: "Otp For H-Management"
// }
// const mail = sendMail(options)

// if(!mail)
// {
//     return next(new ErrorHandler("Problem in Sending Mail",500))
// }

res.status(200).json({
    success: true,
    message: "Mail Sent Successfully",
    otp
})
})

exports.verifyOtp = CatchAsyncError(async(req,res,next)=>{

    const {otp,userEmail} = req.body



    const verify = otplib.totp.check(otp,userEmail+process.env.OTPLIB_SECRET)

    if(!verify)
    {
        return next(new ErrorHandler("Otp is Wrong",401))
    }

    const user = await userModel.findOne({userEmail: userEmail})

    if(!user)
    {
        return next(new ErrorHandler("Not a Valid User",401))
    }

    const today = new Date()
 
    const last = await AttendenceModel.findOne({user: user.id}).sort({_id: -1})
    if(last)
    {
    const diff =Math.abs(moment(last.date).diff(new Date(today.getFullYear(),today.getMonth(),today.getDate()),'days')) 
    let da = last.date
   let prev = new Date(today)
      prev.setDate(today.getDate()-1)
    console.log(da,diff,prev)
    
const Holidays = await HolidayModel.find()
let attendence=[]
    if(diff > 1)
    {
        while(! moment(da).isSame(prev,'day'))
        {

            da.setDate(da.getDate()+1)
          
            if(da.getDay()=== 0 || Holidays.some((dr)=>moment(dr.date).isSame(da,'day') ))
            {
                
            }
            else
            { 
          attendence.push({date: new Date(da), status: "Absent",user: user.id})  
            }
          
        }
        console.log(attendence)
    }
    if(attendence.length > 0)
    {
        const insert = await AttendenceModel.insertMany(attendence)
    }
}

    const alreadyLoggedIn = await AttendenceModel.findOne({date:new Date(today.getFullYear(),today.getMonth(),today.getDate()) ,user: user.id})
    
    if(!alreadyLoggedIn)
    {
    const attendence = await AttendenceModel.create({
        date: new Date(today.getFullYear(),today.getMonth(),today.getDate()),
        loginTime: Date.now(),
        user: user.id
    }) 
}  



    SendToken(user,res,200)


})

exports.viewProfile = CatchAsyncError(async(req,res,next)=>{

    const {userEmail} = req.user

    const user = await userModel.findOne({userEmail: userEmail})

    if(!user)
    {
        return next(new ErrorHandler("No user Found",401))
    }

    res.status(200).json({
        success: true,
        message: "Logged in",
        user
    })
})

exports.requestLeave = CatchAsyncError(async(req,res)=>{
    const user = req.user

    const {type,reason,startDate,endDate} = req.body

    const leave = await LeaveModel.create({type,reason,startDate,endDate,user: user.id,userName: user.userName})

    if(!leave)
    {
        return next(new ErrorHandler("Error in adding Leave Request",400))
    }

    res.status(201).json({
        success: true,
    
    })
})

exports.getAnnouncement = CatchAsyncError(async(req,res)=>{

    const announcements = await AnnouncementModel.find()

    if(!announcements)
    {
        return next(new ErrorHandler("No Announcements yet available",400))
    }

    res.status(200).json({
        success: true,
        announcements
    })
})

exports.getUserLeaveHistory = CatchAsyncError(async(req,res,next)=>{

    const user = req.user

    const leaves = await LeaveModel.find({user: user.id,$or:[{status: 'Approved'},{status:'Declined'}]})

    if(!leaves)
    {
        return next(new ErrorHandler("No Data Available",400))
    }

    res.status(200).json({
        success: true,
        leaves
    })
})

exports.dashboard = CatchAsyncError(async(req,res)=>{

    const user = req.user
    const today = new Date()

    const firstdate = new Date(today.getFullYear(),today.getMonth(), 1, 0, 0, 0)
    const lastDate = new Date(today.getFullYear(),today.getMonth()+1, 0, 23, 59, 59, 999)

    const attendence = await AttendenceModel.find({status:'Present',date:{$gte: firstdate,$lte: today}})
    

    const present = attendence.length

    const percent = (present/today.getDate()) * 100

    const tasks = (await SpreadsheetModel.find({user: user.id,date:{$gte: firstdate,$lte: lastDate},status:'completed'})).length

    
    
    


    res.json({
        success: true,
        present,
        attendence,
        percent,
        tasks
    })




  
})