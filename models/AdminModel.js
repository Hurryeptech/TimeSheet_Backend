const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({

    adminName:{
        type: String,
        required:[true,"Please Enter Admin Name"]
    },
    adminEmail:{
        type: String,
        required:[true,"Please Enter Admin Email"]
    },
    role:{
        type: String,
        default: 'admin'
    }
})

adminSchema.methods.getJwtToken = function(){

  return   jwt.sign({id: this.id},secrets.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES})
}

module.exports = mongoose.model("Admin",adminSchema)