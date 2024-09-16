const userModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")
const CatchAsyncError = require("./CatchAsyncError")
const AdminModel = require("../models/AdminModel")

exports.authenticate = async (req,res,next)=>{
    
   
    const token = req.headers['authorization']
    if(!token)
        {
            return next(new ErrorHandler("Login first to continue",401))
        }

    const bearer = token && token.split(' ')[1]
    
    const accessToken = bearer

    const verified = jwt.verify(accessToken,process.env.JWT_SECRET,{ignoreExpiration: true} )

    if(!verified)
    {
        return next(new ErrorHandler("Your Session Is Expired",401))
    }

    const user =  await userModel.findById(verified.id)
    if(!user)
    {
        return next(new ErrorHandler("Not a User",401))
    }

    req.user = user
    next()
}

exports.authenticateAdmin = async(req,res,next)=>{

    const token = req.headers['authorization']

    if(!token)
    {
        return next(new ErrorHandler("Log in first to continue",401))
    }
    const bearer = token.split(' ')[1]
    const accessToken = bearer

    const verified = jwt.verify(accessToken,process.env.JWT_SECRET)
    if(!verified)
    {
        return next(new ErrorHandler("Your session is expired",401))
    }

    const admin = await AdminModel.findById(verified.id)
    if(!admin)
    {
        return next(new ErrorHandler("Not an Valid admin user",401))
    }

    req.admin = admin
    next()
}
exports.authenticateRole = function(...roles){

   return async(req,res,next)=>
   {
    if(!(roles.includes(req.admin.role)))
    {
        return next(new ErrorHandler("Admins can only login",401))
    }
    next()
   }
}