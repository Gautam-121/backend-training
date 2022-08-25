const productController = require("../models/productModel")

const createProduct =async (req,res)=>{

    let data = req.body

    const saveData = await productController.create(data)

    res.send({msg : saveData , status : true})
}

module.exports.createProduct = createProduct