
const { isValidObjectId, trusted } = require("mongoose")
const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }






// const getBooksData = async function (req, res) {
//     let allBooks = await BookModel.find({ authorName: "HO" })
//     console.log(allBooks)
//     if (allBooks.length > 0) res.send({ msg: allBooks, condition: true })
//     else res.send({ msg: "No books found", condition: false })
// }


// const updateBooks = async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks = await BookModel.findOneAndUpdate(
//         { authorName: "ABC" }, //condition
//         { $set: data }, //update in data
//         { new: true, upsert: true } ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT
//     )

//     res.send({ msg: allBooks })
// }

// const deleteBooks = async function (req, res) {
//     // let data = req.body 
//     let allBooks = await BookModel.updateMany(
//         { authorName: "FI" }, //condition
//         { $set: { isDeleted: true } }, //update in data
//         { new: true } ,
//     )

//     res.send({ msg: allBooks })
// }



// const totalSalesPerAuthor = async function (req, res) {
//     // let data = req.body 
//     let allAuthorSales = await BookModel.aggregate(
//         [
//             { $group: { _id: "$authorName", totalNumberOfSales: { $sum: "$sales" } } },
//             { $sort: { totalNumberOfSales: -1 } }
//         ]
//     )

//     res.send({ msg: allAuthorSales })
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



// module.exports.createBook = createBook
// module.exports.getBooksData = getBooksData
// module.exports.updateBooks = updateBooks
// module.exports.deleteBooks = deleteBooks
// module.exports.totalSalesPerAuthor = totalSalesPerAuthor


const createOrder = async (req,res)=>{ 

    const data = req.body
    
    if(!data.userId) return res.send({msg : "UserId is required"})
    if(!isValidObjectId(data.userId)) return res.send({msg : `${data.userId} is not valid objectId`})
    if(!data.productId) return res.send({msg : "ProductId is required"})
    if(!isValidObjectId(data.productId)) return res.send({msg : `${data.productId} is not valid objectId`})

    const userDetail = await userModel.findById(data.userId).select({balance : 1 , _id : 0})

    if(!userDetail) return res.send({msg : "UserId is not from user Collection"})

    const productDetail = await productModel.findById(data.productId).select({price : 1 ,_id : 0})

    if(!productDetail) return res.send({msg : "ProductId os not from product collection"})

    if(req.isfreeappuser=="true"){    
        
        data["isFreeAppUser"] = req.isfreeappuser
        const saveData = await orderModel.create(data)
        return res.send({msg : saveData , status : true})
    }

    if(userDetail.balance < productDetail.price){
        return res.send({msg : "user have not sufficient balance to purchase the product", status : false})
    }

    const remainingBalance = userDetail.balance -  productDetail.price

    const userBalanceUpdate = await userModel.findByIdAndUpdate({_id : data.userId},{$set : {balance : remainingBalance }},{new : true})
    
    data["isFreeAppUser"] = req.isfreeappuser
    data["amount"] = productDetail.price

    const savedData = await orderModel.create(data)

    console.log(data)
   

    res.send({msg : savedData , status : true})

}

module.exports.createOrder = createOrder