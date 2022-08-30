const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const middleWare = require("../middleWare/middleWare")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/resigterUser", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", middleWare.tokenVerify, userController.getUserData)

router.put("/users/:userId", middleWare.tokenVerify, userController.updateUser)

router.delete("/deletedUser/:userId", middleWare.tokenVerify, userController.deleteUser)

module.exports = router;