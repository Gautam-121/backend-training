
const express = require('express');
const router = express.Router();

// router.get('/test-me', function (req, res) {
//     console.log('My batch is', abc.name)
//     abc.printName()
//     logger.welcome()

//     res.send('My second ever api!')
// });

// router.get('/students', function (req, res){
//     let students = ['Sabiha', 'Neha', 'Akash']
//     res.send(students)
// })

// router.get('/student-details/:name', function(req, res){
//     /*
//     params is an attribute inside request that contains 
//     dynamic values.
//     This value comes from the request url in the form of an 
//     object where key is the variable defined in code 
//     and value is what is sent in the request
//     */

//     let requestParams = req.params

//     // JSON strigify function helps to print an entire object
//     // We can use any ways to print an object in Javascript, JSON stringify is one of them
//     console.log("This is the request "+ JSON.stringify(requestParams))
//     let studentName = requestParams.name
//     console.log('Name of the student is ', studentName)

//     res.send('Dummy response')
// })

//=================================ASSIGNMENT 1 ======================================================//

router.get("/movies", (req, res) => {

    const movieName = ["Rang de basanti", "The shining", "Lord of the ring", "Batman begins", "Bahubali", "Spiderman", "Nambi Effect"]

    res.send(movieName)

})

//==============================ASSIGNMENT 2 AND 3 ==========================================================//

router.get("/movies/:indexNumber", (req, res) => {

    const movieName = ["Rang de basanti", "The shining", "Lord of the ring", "Batman begins", "Bahubali", "Spiderman", "Nambi Effect"]
    let ind = req.params // ind = { indexNumber : 3}
    let indexOfMovie = + (ind.indexNumber)

    console.log(ind)

    console.log(typeof indexOfMovie)
    if (indexOfMovie === 0) {
        return res.send(movieName[0])
    }
    if (!indexOfMovie) {
        return res.send("Please provide valid index Number")
    }
    if (indexOfMovie < 0 || indexOfMovie >= movieName.length) {
        return res.send("the index value is not correct")
    }

    res.send(movieName[indexOfMovie])


})

//====================================Assignment 4 ============================================================//


router.get("/films", (req, res) => {

    const movieData = [
        {
            id: 1,
            name: "The Shining"
        },
        {
            id: 2,
            name: "Incendies"
        },
        {
            id: 3,
            name: "Rang de Basanti"
        },
        {
            id: 4,
            name: "Finding Nemo"
        }
    ]

    res.send(movieData)

})

//========================================Assignment 5==========================================================//

router.get("/films/:filmId", (req, res) => {

    const movieData = [
        {
            id: 1,
            name: "The Shining"
        },
        {
            id: 2,
            name: "Incendies"
        },
        {
            id: 3,
            name: "Rang de Basanti"
        },
        {
            id: 4,
            name: "Finding Nemo"
        }
    ]

    const filmNameWithId = +(req.params.filmId) // {filmId : 3}

    if (filmNameWithId === 0) {
        return res.send("No movie present with this id")
    }
    if (!filmNameWithId) {
        return res.send("please provide filmId")
    }
    for (let i = 0; i < movieData.length; i++) {
        if (movieData[i].id === filmNameWithId) {
            return res.send(movieData[i])
        }
    }

    res.send("No movie present with this id")

})

// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
// Your route code will look like this

router.get("/sol1", function (req, res) {

    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array

    ///LOGIC WILL GO HERE

    let firstNthNumber = [1,2,3,5,6,7]

    let sum = firstNthNumber.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)     // (1+2+3+5+6+7 = 24)

    let lastNumberArrray = firstNthNumber.pop()

    let sumFirstNhtNumber = lastNumberArrray * (lastNumberArrray + 1) / 2  // (7(7+1)/2) == 28 (n(n+1)/2)

    let missingNumberInArray = sumFirstNhtNumber - sum   // 28 - 24 == 4

    res.send({ data: missingNumberInArray });
});

// -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
// Your route code will look like this

router.get("/sol2", function (req, res) {

    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. 
    //now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing

    const arrayOfNumber = [33, 34, 35, 37, 38]

    ///LOGIC WILL GO HERE 


    let sumOfArray = arrayOfNumber.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0) // (33+34+35+37+38)

    let firstElementOfArray = arrayOfNumber.shift()
    let lastNumberOfArrray = arrayOfNumber.pop()

    let sumOfElement = 0;

    for (let i = firstElementOfArray; i <= lastNumberOfArrray; i++) {
        sumOfElement += i // sumOfElement = sumOfElement + i
    }// (33+34+35+36+37+38)

    let missingElementInArray = sumOfElement - sumOfArray // 36

    res.send({ data: missingElementInArray });
});





module.exports = router;