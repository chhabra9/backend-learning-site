const {isEmailExist,createUser,getUser} = require('../models/user.model');
const {validationResult} = require('express-validator');
const {getInstructorId} = require('../models/Instructor.model');
const jwt = require('jsonwebtoken');
const signupUser  = async (req,res)=>{
   const validationRes = validationResult(req);
    if(validationRes.errors.length){
       return res.status(400).json('Invalid data in the request body')
    }
    try {
        const isExist = await isEmailExist(req.body.email);
        if (isExist) {
            return res.status(400).json('Email already exists');
        } else {
            const createdUser = await createUser(req.body);
           return res.status(200).json(createdUser);
        }

    } catch(err){
        return res.status(500).json(err.message)
    }
}
const loginUser = async(req,res)=>{

    const validationRes =  validationResult(req);
    if(validationRes.errors.length){
      return res.status(400).json('Invalid data in the request body')
   }
   try{
    const isExist = await isEmailExist(req.body.email);
    if(isExist){
        const user = await getUser(req.body.email);
        if(user.password ===req.body.password){
            const {password,...payloadUser} = user;
            const token = jwt.sign(payloadUser,process.env.ACCESS_TOKEN_SECRET);
                if(payloadUser.isInstructor ===1){
                  const instructorId=await getInstructorId(req.body.email);
                  return res.status(200).json({email:payloadUser.email,access_token:token,isInstructor:payloadUser.isInstructor,instructorId:instructorId})
                }
                else{
                    return res.status(200).json({email:payloadUser.email,access_token:token,isInstructor:payloadUser.isInstructor})

                }
        }else{
            return res.status(401).json('Invalid email/password');
        }
    } else{
        return res.status(401).json('Invalid email/password' )
    }
   } catch(err){
    res.status(500).json('Internal Server error');
   }
}
module.exports ={signupUser,loginUser}