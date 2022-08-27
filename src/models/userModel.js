const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required: "First name is required"
    },
    lastName : {
        type: String,
        required: "Last name is required"
    },
    mobile : {
        type: String,
        unique: true
    },
    emailId : {
        type: String,
        unique: true,
        required : "Email id is required"
    },
    password : {
        type: String,
        required: "Password is required"
    },
    gender : {
        type: String,
        enum: ["male", "female", "other"]
    },
    isDeleted : {
        type: Boolean,
        default: false
    },
    age: Number,

}, { timestamps: true })

module.exports = mongoose.model("newUser",userSchema)