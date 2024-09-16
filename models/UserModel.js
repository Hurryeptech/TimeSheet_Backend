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
    ],
    image:{
        type: String,
        required:[true,"Please Upload Image"]
    },
    position:{
        type: String,
        required:[true,"Please Enter Position"]
    },
    mobile:{
        type: Number,
        required:[true,"Please Enter Mobile"]
    },
    dob:{
        type: Date,
        required:[true,"Please Enter Date Of Birth"]
    },
    bio:{
        type: String
    },
    proficiency:[
        {
            design:{
                type: Number
            },
            frontEnd:{
                type: Number
            },
            backEnd:{
                type: Number
            }
        }
    ],
    skills:[
        
    ],
    department:{
        type: String
    },
    address:{
        type: String
    },
    role:{
        type: String
    }

    
})

userSchema.methods.getJwtToken = function(){

    return jwt.sign({id: this.id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES})
    
}

module.exports = mongoose.model("User",userSchema)