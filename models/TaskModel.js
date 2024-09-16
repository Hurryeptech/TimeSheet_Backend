const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    date:{
        type: Date
    },
    internName:{
        type: String,

    },
    client:{
        type: String
    },
    assignee:{
        type: String,
      
    },
    dueDate:{
        type: Date,
     
    },
    task:{
        type:String,
     
    },
    status:{
        type: String,
        
    },
    description:{
        type: String,
      
    
    },
    details:{
        type:String
    },
    employeeStatus:{
        type: String
    },
    teams:[
        {
            type: mongoose.Types.ObjectId,
            ref: "teams"
        }
    ],
    user:{
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
})

module.exports = mongoose.model("task",taskSchema)