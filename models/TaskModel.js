const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    internName:{
        type: String,
        required:[true,"Please Enter InternName"]
    },
    assignee:{
        type: String,
        required:[true,"Please Enter Assignee"]
    },
    dueDate:{
        type: Date,
        required:[true,"Please Enter Due Date"]
    },
    task:{
        type:String,
        required:[true,"Please Enter Task Name"]
    },
    status:{
        type: String,
        enum:["Completed","In Progress"]
    },
    description:{
        type: String,
    
    },
    teams:[
        {
            type: mongoose.Types.ObjectId,
            ref: "teams"
        }
    ]
})

module.exports = mongoose.model("task",taskSchema)