const mongoose = require("mongoose")
const LeaveSchema = new mongoose.Schema({

    user:{
        type: mongoose.Types.ObjectId,
        ref:"users"
    },
    userName:{
        type: String
    },
    type:{
        type: String
    },
    startDate:{
        type: Date,
        required:[true,"Please Enter Start Date"]
    },
    endDate:{
        type: Date,
        required:[true,"Please Enter End Date"]
    },
    reason:{
        type: String
    },
    status:{
        type: String,
        default: 'progress'
    },
    rejectReason:{
        type: String
    }

})

module.exports = mongoose.model("Leave",LeaveSchema)