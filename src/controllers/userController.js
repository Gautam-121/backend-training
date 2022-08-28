const jwt = require("jsonwebtoken");
const { update, findByIdAndUpdate } = require("../models/userModel");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  xyz.send({ msg: savedData });
};

// const loginUser = async function (req, res) {
//   let userName = req.body.emailId;
//   let password = req.body.password;

//   let user = await userModel.findOne({ emailId: userName, password: password }); // {} , null
//   if (!user)
//     return res.send({
//       status: false,
//       msg: "username or the password is not corerct",
//     });

//   // Once the login is successful, create the jwt token with sign function
//   // Sign function has 2 inputs:
//   // Input 1 is the payload or the object containing data to be set in token
//   // The decision about what data to put in token depends on the business requirement
//   // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
//   // The same secret will be used to decode tokens 
//   let token = jwt.sign(
//     {
//       userId: user._id.toString(),
//       batch: "thorium",
//       organisation: "FunctionUp",
//     },
//     "my name is gautam"
//   );
//   res.setHeader("x-auth-token", token);
//   res.send({ status: true, token: token });
// };


const loginUser = async (req,res)=>{
      
     let  emailUser = req.body.emailUser
     let passwordUser = req.body.passwordUser

     const userExist = await userModel.findOne({emaiId : emailUser ,password : passwordUser})

     if(!userExist) return res.send({msg : `No user refgister with ${emailUser}`, status : false})

     const token = await jwt.sign(
      {
        user : userExist._id.toString(),
        batch : "Plutonium",
        org : "FunctionUp"
      }, 
         "MynameisGautam"
      )

      res.setHeader("x-auth-token",token)
      res.send({token : token , status : true})

} 

// const getUserData = async function (req, res) {
//   let token = req.headers["x-Auth-token"];
//   if (!token) token = req.headers["x-auth-token"];

//   //If no token is present in the request header return error. This means the user is not logged in.
//   if (!token) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);

//   // If a token is present then decode the token with verify function
//   // verify takes two inputs:
//   // Input 1 is the token to be decoded
//   // Input 2 is the same secret with which the token was generated
//   // Check the value of the decoded token yourself

//   // Decoding requires the secret again. 
//   // A token can only be decoded successfully if the same secret was used to create(sign) that token.
//   // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
//   let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
//   if (!decodedToken)
//     return res.send({ status: false, msg: "token is invalid" });

//   let userId = req.params.userId;
//   let userDetails = await userModel.findById(userId);
//   if (!userDetails)
//     return res.send({ status: false, msg: "No such user exists" });

//   res.send({ status: true, data: userDetails });
//   // Note: Try to see what happens if we change the secret while decoding the token
// };

const getUserData = async(req,res)=>{
  
  let token = req.headers["x-Auth-Token"]
  let userId = req.params.userId

  if(!token) token = req.headers["x-auth-token"]

  if(!token) res.send({msg : "token is absent",status : false})

  let tokenVerify = await jwt.verify(token , "MynameisGautam")

  if(!tokenVerify) return res.send({msg : "token is not match",status : false})

  let userDetail = await userModel.findById(userId)

  if(!userDetail) return res.send({msg : "No document found ",status : true})

  res.send({msg : userDetail , status : true})

}


// const updateUser = async function (req, res) {
//   // Do the same steps here:
//   // Check if the token is present
//   // Check if the token present is a valid token
//   // Return a different error message in both these cases

//   let userId = req.params.userId;
//   let user = await userModel.findById(userId);
//   //Return an error if no user with the given id exists in the db
//   if (!user) {
//     return res.send("No such user exists");
//   }

//   let userData = req.body;
//   let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
//   res.send({ status: updatedUser, data: updatedUser });
// };

const updateUser = async(req,res)=>{

  let token = req.headers["x-Auth-Token"]
  let userId = req.params.userId
  let uspadateUserData = req.body

  if(!token) token = req.headers["x-auth-token"]

  if(!token) res.send({msg : "token is absent",status : false})

  let tokenVerify = await jwt.verify(token , "MynameisGautam")

  if(!tokenVerify) return res.send({msg : "token is not match",status : false})

  let userDetail = await userModel.findById(userId)

  if(!userDetail) return res.send({msg : "No document found ",status : true})

  let updateDetail = await userModel.findByIdAndUpdate({_id : userId},{$set : uspadateUserData},{new : true})

  res.send({msg : updateDetail , status : true})

}

const deleteUser = async(req,res)=>{
     
  let token = req.headers["x-Auth-Token"]
  let userId = req.params.userId
  
  if(!token) token = req.headers["x-auth-token"]

  if(!token) return res.send({msg : "token is absent",status : false})

  let tokenVerify = await jwt.verify(token , "MynameisGautam")

  if(!tokenVerify) return res.send({msg : "token is not match",status : false})

  let userDetail = await userModel.findById(userId)

  if(!userDetail) return res.send({msg : "No document found ",status : true})

  const deleteUserData = await userModel.findByIdAndUpdate({_id : userId},{$set : {isDeleted : true}},{new : true})

  res.send({msg : deleteUserData , status : true})

}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
