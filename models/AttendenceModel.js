const mongoose = require("mongoose")

const attendenceSchema = new mongoose.Schema({

    date:{
        type: Date,
    },
    loginTime:{
        type: Date
    },
    logoutTime:{
        type: Date
    },
    halfDay:{
        type: Number
    },
    late:{
        type: Number
    },
    status:{
        type: String
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"users"
    }
})

module.exports = mongoose.model("attendence",attendenceSchema)