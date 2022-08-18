const userModel = require("../models/authorModel")


const createAuthorData = async(req,res)=>{

    let data = req.body 

    if(Object.keys(data).length==0){

        res.send({msg : "Provide user data",status : false})
    }

    if(!data.author_id){

       return res.send({msg : "author_id is required",status : false})
    }

    const saveData = await userModel.create(data)

    res.send({msg: saveData, status : true})
}

module.exports.createAuthorData = createAuthorData