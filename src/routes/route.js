const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

router.post("/players",(req,res)=>{

    let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ],
         

       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],

          
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],

       },
   ]

    let newPlayerData = req.body
    let playerName = newPlayerData.name

    for(let i=0;i<players.length;i++){
        if(players[i].name == playerName){
           return  res.send({msg : `The player name ${playerName} is alreqdy exist`,status : false})
        }
    }
    players.push(newPlayerData)
    res.send({msg : players, status : true})
})

router.post("/players/:playerName/bookings/:bookingId",(req,res)=>{

    let players =
    [
        {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ],
 
            "bookingNumber": 1,
            "sportId": " ",
            "centerId": " ",
            "type": "private",
            "slot": 16286598000000,
            "bookedOn": 31/08/2021,
            "bookedFor": 01/09/2021
          
 
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ],
 
            "bookingNumber": 2,
            "sportId": " ",
            "centerId": " ",
            "type": "private",
            "slot": 16286598000000,
            "bookedOn": 31/08/2021,
            "bookedFor": 01/09/2021
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ],
 
            "bookingNumber": 3,
            "sportId": " ",
            "centerId": " ",
            "type": "private",
            "slot": 16286598000000,
            "bookedOn": 31/08/2021,
            "bookedFor": 01/09/2021
        },
    ]

    let queryPara = req.params
    console.log(queryPara)
    let playersName =  queryPara.playerName
    let idBooking = queryPara.bookingId
    let isPlayerExist = false
    let idExist = false


    for(let i=0;i<players.length;i++){
        if(players[i].name == playersName){
            isPlayerExist = true;
            break;
        }
    }

    if(isPlayerExist){
        for(let i=0;i<players.length;i++){
              if(players[i].bookingNumber == idBooking){
                      idExist = true;
                        break;
              }
        }

    }else{
       return res.send({msg : "player not present in team",status : false})
    }

    if(idExist){

       return res.send({msg : "This Booking Id already proceed", status : false})

    }else{
        
         for(let i=0;i<players.length;i++){
            if(players[i].name == playersName){
                players[i].bookingNumber = idBooking
            }
         }
    }
   
    res.send({msg : players, status : true})
})

let person = [
    {
        name: "pk",
        age: 10,
        votingStartus: false
    },
    {
        name: "sk",
        age: 20,
        votingStartus: false
    },
    {
        name: "AA",
        age: 70,
        votingStartus: false
    },
    {
        name: "SC",
        age: 5,
        votingStartus: false
    },
    {
        name: "HO",
        age: 40,
        votingStartus: false
    },
]

router.post("/getvotingstatus", function (req, res) {
    let VotingAge = req.query.age
    let ElegiblePerson = []
    for (let i = 0; i < person.length; i++) {

        if (person[i].age > VotingAge) {
            person[i].votingStartus = true;
            ElegiblePerson.push(person[i])
        }
    }

    res.send({ Persons: ElegiblePerson, status: true })
})



module.exports = router;