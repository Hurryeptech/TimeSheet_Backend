const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true,"Please Enter Event Name"]
    },
    start:{
        type: Date,
        required:[true,"Please Enter Event Date"]
    },
    end:{
        type: Date,
        required:[true,"Please Enter Event Date"]
    },
    user:[
        {
            type: mongoose.Types.ObjectId
        }
    ]
    
})

module.exports = mongoose.model("Event",eventSchema)