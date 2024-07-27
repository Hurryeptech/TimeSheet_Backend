const mongoose = require("mongoose")

const attendenceSchema = new mongoose.Schema({

    date:{
        type: String,
        required:[true,"Please Enter Date"]
    },
    time:{
        type: Date
    },
    logoutTime:{
        type: Date
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"users"
    }
})

module.exports = mongoose.model("attendence",attendenceSchema)