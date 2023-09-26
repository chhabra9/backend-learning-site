const {createInstructor,isInstructorWithEmailExist} = require('../models/Instructor.model');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const createNewInstructor  = async (req,res)=>{

    try {
        const isExist = await isInstructorWithEmailExist(req.body.email);
        if (isExist) {
            return res.status(400).json('Email already exists');
        } else {
            await createInstructor(req.body);
           return res.status(200).json("Instructor Created Successfully");
        }

    } catch(err){
       
        return res.status(500).json(err.message)
    }
}
module.exports = {createNewInstructor};