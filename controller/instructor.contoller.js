const {createInstructor,isInstructorWithEmailExist} = require('../models/Instructor.model');
const {makeUserInstructor} = require('../models/user.model');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const createNewInstructorController  = async (req,res)=>{
    try {
        const userId = req.params.user_id;
        const isExist = await isInstructorWithEmailExist(userId);
        if (isExist) {
            return res.status(400).json('Email already exists');
        } 
        else {
            await createInstructor({...req.body,userId});
            await makeUserInstructor(userId);
           return res.status(200).json("Instructor Created Successfully");
        }

    } catch(err){
       
        return res.status(500).json(err.message)
    }
}
module.exports = {createNewInstructorController};