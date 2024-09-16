const mongoose = require("mongoose")

const spreadsheetSchema = new mongoose.Schema({
     
   date:{ type:Date
   },
    client:{ type: String
    }, 
    assignee:{ type: String
    }, 
    task:{type: String
    }, 
    details:{ type: String
    }, 
    status:{ type:String
    },
    user:[
        {
            type: mongoose.Types.ObjectId,
            ref:"users"
        }
    ]
})

module.exports = mongoose.model("Spreadsheet",spreadsheetSchema)
