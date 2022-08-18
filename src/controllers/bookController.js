const bookModel = require("../models/bookModel")
const authorModel = require("../models/authorModel")


const createBook = async (req,res)=>{

    let data = req.body

    console.log(data)

    if(Object.keys(data).length==0){

        res.send({msg : "Please insert a data ", status : false})
    }

    if(!data.author_id){   // data.author_id == value (undefined) if(!undefined)    undefined is false
        
       return  res.send({msg : "author_id is required"})
    }
     
    let saveData = await bookModel.create(data)

    res.send({msg : saveData, status : true})
}

const allbookByAuthor = async (req,res)=>{
     
    let filterQuery = req.query

    if(Object.keys(filterQuery).length==0){

        res.send({msg : "Please provide authorName",status : false})
    }

    const uniqueAuthor = await authorModel.findOne(filterQuery).select({author_id : 1, _id:0}) // findone no document match then return null , if match return first matching document in form of object

    console.log(uniqueAuthor)

     if(!uniqueAuthor){

        return  res.send({msg : "No author found " , status : false})
     }

    const allBooks = await bookModel.find({author_id : uniqueAuthor.author_id}) //  find no document match then return empty array, if match return all matching document in form of array of an object

    if(allBooks.length==0){

           return res.send({msg : "no document found with author name", status : false})
    }

    res.send({msg : allBooks ,status : true})

    
}

const findAuthor = async (req,res)=>{
     
    let filterQuery = req.query

      if(Object.keys(filterQuery).length==0){

        res.send({msg : "please provide bookName", status : false})
    }

    const bookId = await bookModel.findOneAndUpdate(filterQuery,{price : 100},{new : true})

    console.log(bookId)

    if(!bookId){

       return  res.send({msg : "No book found",status : false})
    }

    const authorName = await authorModel.find({author_id : bookId.author_id})

    if(authorName.length ==0){

       return  res.send({msg : "No Author found with this name"})
    }

    res.send({msg : authorName, price : bookId.price , status : true})
}

const findBookWithAuthorName = async(req,res)=>{

    const allBook = await bookModel.find({price : {$gte :50 , $lte :100}}).select({author_id:1,_id:0})


    console.log(allBook)

    if(allBook.length==0){

      return res.send({msg : "No document found",status : false})
    }

    const allauthor = await authorModel.find()

    console.log(allauthor)
    
    let allName = []

    for(let i=0;i<allBook.length;i++){
        let data = allBook[i]
        for(let j=0;j<allauthor.length;j++){
            if(data.author_id == allauthor[j].author_id){
                 allName.push(allauthor[j])
            }
        }
    }
   
    if(allName.length==0){
        
        return res.send({msg : "No author of books found",status : false})
    }

    console.log(allName)

    res.send({msg : allName , status : true})
    
}


module.exports.createBook = createBook
module.exports.allbookByAuthor = allbookByAuthor
module.exports.findAuthor = findAuthor
module.exports.findBookWithAuthorName = findBookWithAuthorName