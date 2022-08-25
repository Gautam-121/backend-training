const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: "Product name is required"
    },
    category: {
        type: String,
        required: "Product category is required"
    },
    price: {
        type: Number,
        required: "Price is required"
    }
}, { timestamps: true })

module.exports = mongoose.model("Myproduct", productSchema)