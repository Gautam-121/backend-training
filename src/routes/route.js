const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", BookController.createBook  )

router.get("/getAllBooks", BookController.getAllBooks)

router.get("/bookInYear", BookController.bookInYear  )

router.post("/getParticularBooks", BookController.getParticularBooks  )

router.get("/getXINRBooks", BookController.getXINRBooks)

router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;