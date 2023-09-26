
const router = require('express').Router();
const {getUsers}  = require('../controller/user.controller');

const authorizeAdmin =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token ==null){
        return res.status(403).json("no token available")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)
            return res.status(403).json("Unauthorized Access:Login First");
        if(!user.isAdmin){
            return res.status(401).json("Unauthorized Access: User is not authorizre to access the resource");
        }
        next()
    })
    }
router.get('/',authorizeAdmin,getUsers);

module.exports = router