const {createInstructor,isInstructorWithEmailExist} = require('../models/Instructor.model');
const {makeUserInstructor} = require('../models/user.model');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const createNewInstructorController  = async (req,res)=>{
    try {
        const {email} = req.body;
        const isExist = await isInstructorWithEmailExist(email);
        if (isExist) {
            return res.status(400).json('Email already exists');
        } else {
            await createInstructor(req.body);
            makeUserInstructor(email);
           return res.status(200).json("Instructor Created Successfully");
        }

    } catch(err){
       
        return res.status(500).json(err.message)
    }
}
module.exports = {createNewInstructorController};