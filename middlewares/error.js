module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500
    let error = err

    if(err.name === "ValidationError")
    {
        message = Object.values(err.errors).map(value => value.message)
        error = new Error(message)
        err.statusCode = 400
    }

    res.status(err.statusCode).json({
        success: false,
        message : error.message || "internal Error"   
    })
}