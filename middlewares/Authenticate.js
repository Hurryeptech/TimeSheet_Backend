const userModel = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")

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