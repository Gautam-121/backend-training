const publisherModel = require("../models/publisherModel")

const createPublisher = async(req,res)=>{

    let data = req.body

    const saveData = await publisherModel.create(data)

    res.send({msg : saveData , status : true})
}


module.exports.createPublisher = createPublisher