const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController= require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthors", authorController.createAuthors  )

router.post("/createPublisher", publisherController.createPublisher)

router.post("/createBooks", bookController.createBooks )

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

router.put("/books", bookController.books)

router.put("/bookRatingmore", bookController.bookRatingmore)

module.exports = router;