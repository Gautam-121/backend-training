const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type :String, 
        required : "Book name is required"
    },
    authorName: String, 
    tags: [String],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    sales: {type: Number, default: 10},
    year : {
        type : Number,
        default : 2021
    },
    totalPages : Number,
    stockAvailable : Boolean
}, { timestamps: true });


module.exports = mongoose.model('vook', bookSchema) //vooks

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
