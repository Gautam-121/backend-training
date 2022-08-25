const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type : String,
        required : "Name is required"
    },
	balance:{
        type : Number,
        default : 100
    }, 
	address: String,
	age: Number,
 	gender: {
        type : String,
        enum : ["male","female","other"]
    },
	isFreeAppUser: {
        type : Boolean,
        default : false
}
}, {timestamps : true})


module.exports = mongoose.model("Myuser",userSchema)