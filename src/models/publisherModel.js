const mongoose = require("mongoose")

const publisherSchema = new mongoose.Schema({

    name: {
        type : String,
        required : true
    },
    headQuarter: String,

})


module.exports = mongoose.model("Mypublisher",publisherSchema)