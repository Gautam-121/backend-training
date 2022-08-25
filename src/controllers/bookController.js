const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
 const ObjectId = require('mongoose').Types.ObjectId;

const createBooks= async function (req, res) {
    let data = req.body

    if(!data.author){
        return res.send({msg : "Author_Id is required"})    
    }
    if(!ObjectId.isValid(data.author)){

        return res.send({msg : `${data.author} is not valid Object id`})
    }

    let authorId = await authorModel.findById(data.author)

    if(!authorId){

        return res.send({status : false , msg : "author_id is not from author collection"})
    }

    if(!data.publisher){

        return res.send({msg : "publisher_id is required"})
    }

    if(!ObjectId.isValid(data.publisher)){

        return res.send({msg : `${data.publisher} is not valid Object id`})
    }

    let publisherId = await publisherModel.findById(data.publisher)

    if(!publisherId){

        return res.send({msg : "publisher_id is not from publisher collection"})
    }

    const saveData = await bookModel.create(data)

    res.send({msg : saveData , status : true})

}


const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate("author publisher")
    //let specificBook = await bookModel.find().populate("author").populate("publisher")
    res.send({data: specificBook, status : true})

}

const books = async function(req,res){
     
    const publishers = await publisherModel.find({$or: [{name : "Penguin"},{name : "HarperCollins"}]}).select({_id : 1})

    // const publishers = await publisherModel.find({name : ["Penguin","HarperCollins"]})

    let newPublisher = []

    for (let object of publishers){
         newPublisher.push(object._id)
    }

    const bookwithPublisherUpdate = await bookModel.updateMany({publisher :{$in :  newPublisher}},{$set : {isHardCover:true}},{new : true})

    const bookwithPublisher =  await bookModel.find({publisher :{$in : newPublisher}})

    //const bookwithPublisher =  await bookModel.find({publisher : [publishers[0]._id,publishers[1]._id]})

    res.send({msg : bookwithPublisher , status : true})

}

const bookRatingmore = async (req,res)=>{

    let authorRating = await authorModel.find({rating : {$gt : 3.5}}).select({_id : 1})

    const authorRatingGreaterthan  = []

    for(let object of authorRating){
        authorRatingGreaterthan.push(object._id)
    }

    const updatePriceBooks = await bookModel.updateMany({author : {$in :authorRatingGreaterthan }},{$inc : {price : 20}},{new : true})

    const updatedBooks = await bookModel.find({author : {$in :authorRatingGreaterthan }})

    res.send({msg : updatedBooks , status : true})


    
    }




module.exports.createBooks= createBooks
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.books = books
module.exports.bookRatingmore = bookRatingmore

