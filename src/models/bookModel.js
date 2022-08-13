const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    bookName: {
        type : String,
        required : "book Name is required",
        unique : true
    },
    authorName: String,
    category: {
        type: String,
        enum: ["Crimethriller", "Frictional", "love"]
    },
    year: Number
}, { timestamps: true });

module.exports = mongoose.model('Book', userSchema) //books


