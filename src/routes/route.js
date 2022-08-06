const express = require('express');
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
}
)

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason