const jwt = require("jsonwebtoken")

const tokenVerify = async (req, res, next) => {
    try {

        let token = req.headers["x-Auth-Token"]

        if (!token) token = req.headers["x-auth-token"]

        if (!token) res.status(401).send({ msg: "token is absent", status: false })

        let tokenVerify = jwt.verify(token, "MynameisGautam")

        if (!tokenVerify) return res.status(401).send({ msg: "token is not match", status: false })

        let userLoggedIn = req.params.userId
        let userModified = tokenVerify.userId

        if (userLoggedIn != userModified) return res.status(403).send({ status: false, msg: "user is not right person to modify data" })
        next()
    } catch (error) {
        res.status(500).send({msg :"server error" , error : error.message})
    }
}

module.exports.tokenVerify = tokenVerify