const express = require('express');
const lodash = require("lodash")
const loggerHandler = require("../logger/logger")
const {printDate, printMonth, getBatchInfo} = require("../util/util")
const {trim , lowerCase , upperCase} = require("../validator/formatter")
const router = express.Router();

router.get("/test-function",(req,res)=>{
    res.send("This is my first Api")
        loggerHandler.welcome()
        printDate();
        printMonth();
        getBatchInfo();
        trim();
        lowerCase();
        upperCase();

})


router.get('/test-me',function(req, res){
    let monthOfYear = ["jan","feb","mar","apr","may","jun","jul","aug","sept","oct","nov","dec"]
    let createFourEqualPart = lodash.chunk(monthOfYear,3)
    console.log(createFourEqualPart)

    let firstTenOddNumber = [1,3,5,7,9,11,13,15,17,19]
    let lastNineOddNumber = lodash.tail(firstTenOddNumber)
    console.log(lastNineOddNumber)

    let firstArray = [1,2,3]
    let secondArray = [2,3,4]
    let thirdArray = [3,4,5]
    let fourthArray = [4,5,6]
    let fifthArray = [5,6,7]

    let unionOfAllTheArray = lodash.union(firstArray,secondArray,thirdArray,fourthArray,fifthArray)
    console.log(unionOfAllTheArray)
    
    let movieAndDrama = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
    let pairOfmovieAndDrama = lodash.fromPairs(movieAndDrama)
    console.log(pairOfmovieAndDrama)

    res.send("My first Api")


})
module.exports = router;
// adding this comment for no reason