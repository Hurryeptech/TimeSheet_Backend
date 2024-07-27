const CatchAsyncError = require("../middlewares/CatchAsyncError")
const userModel = require("../models/UserModel")
const ErrorHandler = require("../utils/ErrorHandler")
const otplib = require("otplib")
const sendMail = require("../utils/SendEmail")
const SendToken = require("../utils/SendToken")

exports.signup = CatchAsyncError(async(req,res,next)=>{

    const {userName,userEmail} = req.body

    const user = await userModel.create({
        userName: userName,
        userEmail: userEmail
    })
    
    if(!user)
    {
        return next(new ErrorHandler("Problem in Creating User",500))
    }

    res.status(201).json({
        success: true,
        message: "User Created",
        user
    })
})

exports.signin = CatchAsyncError(async(req,res,next)=>{

    const {userEmail} = req.body
    console.log(req.body)

    const validUser = await userModel.findOne({userEmail: userEmail})

    if(!validUser)
    {
        return next(new ErrorHandler("Not a Valid User",401))
    }

    otplib.authenticator.options= {step: 180,digits: 4}

    const otp = otplib.authenticator.generate(process.env.OTPLIB_SECRET)

const options = {
        to: "msdsuren07@gmail.com",
        html: `<p> Verify Your Otp ${otp}`
}
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
    const verify = otplib.authenticator.check(otp,process.env.OTPLIB_SECRET)

    if(!verify)
    {
        return next(new ErrorHandler("Otp is Wrong",401))
    }

    const user = await userModel.findOne({userEmail: userEmail})

    if(!user)
    {
        return next(new ErrorHandler("Not a Valid User",401))
    }

    // res.status(200).json({
    //     success: true,
    //     message: "Logged in",
    //     user
    // })
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

