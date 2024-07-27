const mongoose = require("mongoose")
const jwt= require("jsonwebtoken")

const userSchema =new  mongoose.Schema({
    userName:{
       type: String,
       required:[true,"Please Enter UserName"]
    },
    userEmail:{
        type: String,
        required:[true,"Please Enter UserEmail"]
    },
    team:[
        {
            type: mongoose.Types.ObjectId,
            ref: "teams"
        }
    ]
   
})

userSchema.methods.getJwtToken = function(){

    return jwt.sign({id: this.id},process.env.JWT_SECRET)
    
}

module.exports = mongoose.model("User",userSchema)