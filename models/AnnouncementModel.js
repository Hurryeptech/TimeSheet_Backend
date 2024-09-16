const mongoose = require("mongoose")

const announcementSchema = new mongoose.Schema({

    date:{
        type: Date
    },
    title:{
        type: String
    },
    description:{
        type: String
    }
})

module.exports = mongoose.model("Announcement",announcementSchema)