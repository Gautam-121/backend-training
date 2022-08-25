const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const createOrder = new mongoose.Schema({

    userId: {
        type: ObjectId,
        ref: "Myuser"
    },
    productId: {
        type: ObjectId,
        ref: "Myproduct"
    },
    amount: {
        type: Number,
        default: 0
    },
    isFreeAppUser: {
        type: Boolean,
    },
    date: Date
}, { timestamps: true })

module.exports = mongoose.model("Myorder", createOrder)