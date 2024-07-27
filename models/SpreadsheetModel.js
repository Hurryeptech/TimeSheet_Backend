const mongoose = require("mongoose")

const spreadsheetSchema = new mongoose.Schema({
     
    row: Number,
    col: Number,
    value: String
})

module.exports = mongoose.model("Spreadsheet",spreadsheetSchema)
