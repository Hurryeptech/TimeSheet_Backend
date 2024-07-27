const mongoose = require("mongoose")

const  teamSchema = new mongoose.Schema({

    teamName:{
        type: String,
        required:[true,"Please Enter Team Name"]
    },
    members:[
        {
        type: mongoose.Types.ObjectId,
        ref: "users"
        }
    ],
    tasks:[
        {
            type: mongoose.Types.ObjectId,
            ref: "tasks" 
        }
    ],
    users:[
        {
            type: mongoose.Types.ObjectId,
            ref: "users"
        }
    ]
})



module.exports = mongoose.model("Team",teamSchema)