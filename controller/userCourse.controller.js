
const {
    createUserCourses,
    isUserHasCourse,
    getUserCourses,
    getInstructorSell,
    getAllStudent,
    getSalesByCourse
}  = require('../models/UserCourses.model');

const  createUserCourseController  =async(req,res)=>{
    console.log('here');
    try{
        if(isUserHasCourse(req.body)){
            return res.status(400).json('User already have course')
        }
         await createUserCourses(req.body);
        return res.status(200).json("Course added successfully");
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }   
}
const getUserCoursesController = async(req,res)=>{

    try{
        const result  = await getUserCourses(req.params.user_id);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }
}
const getInstructorSellController = async(req,res)=>{
    try{
        const result = await getInstructorSell(req.params.instructor_id);
        return res.status(200).json(result);
    }catch(err){
        console.log(err.message)
        res.status(500).json('Internal Server Error');
    }
}
const getAllStudentController = async(req,res)=>{
    try{
        const result = await getAllStudent(req.params.instructor_id);
        console.log(result[0]);
        res.status(200).json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
}
const getSalesByCourseController = async(req,res)=>{
    console.log('sjshsh',req.params.instructor_id);
    try{
        const result = await getSalesByCourse(req.params.instructor_id);
        res.status(200).json(result);
    }catch(err){
        console.log(err.message);
        res.status(500).json('Internal Server Error');
    } 
}
module.exports = 
            {
                getUserCoursesController,
                createUserCourseController,
                getInstructorSellController,
                getAllStudentController,
                getSalesByCourseController
            }