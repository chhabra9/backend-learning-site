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
        
        req.user = user;
        next()
    })
    }
const verifyTokenAndUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.method ==="POST"){
        if(req.body.email !== req.user.email){
            return res.status(403).json("You are not allow do that");
        }
    }
        else if(req.method ==="GET"){
            if(req.query.email !== req.user.email){
                return res.status(403).json("You are not allow do that");
        }
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
