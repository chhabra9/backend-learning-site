const jwt  = require('jsonwebtoken');
const{isInstructorExist} = require('../models/Instructor.model')
const verifyToken =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token ==null){
        return res.status(403).json("no token available")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json("You are not authenticated");
        }
        req.abcd = user;
        next(user)
    })
    }
const verifyTokenAndUser = async(req,res,next)=>{
    await verifyToken(req,res,(user)=>{
           const userId = parseInt(req.params.user_id)
            if(userId !== user.user_id){
                return res.status(403).json("You are not allow do that");
    }
    next();
    })
}
const verifyTokenAndInstructor = async(req,res,next)=>{
    verifyToken(req,res,async ()=>{
            try{
                const instructorId = req.params.instructorId
                const isExist = await isInstructorExist(instructorId);
                if(isExist)
                    next();
                else
                    res.status(403).json("You are not allow do that");
            }catch(errr){
                res.status(500).json("Internal Server Error")
            }
});
}
module.exports  = {verifyToken, verifyTokenAndUser, verifyTokenAndInstructor};
