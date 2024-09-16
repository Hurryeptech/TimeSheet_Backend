const mongoose = require("mongoose")

const holidaySchema = new mongoose.Schema({

    date:{
        type: Date
    },
    reason:{
        type: String
    }
})

module.exports = mongoose.model("Holiday",holidaySchema)