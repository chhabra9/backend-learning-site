
const {createUserCourse,isUserHasCourse, getUserCourses}  = require('../models/UserCourses.model')
const createUserCourseController  =async(req,res)=>{
    try{
        if(isUserHasCourse(req.body)){
            return res.status(400).json('User already have course')
        }
         await createUserCourse(req.body);
        return res.status(200).json("Course added successfully");
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }   
}
const getUserCoursesController = async(req,res)=>{

    try{
        const result  = await getUserCourses(req.query.email);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }
}
module.exports = {getUserCoursesController,createUserCourseController}