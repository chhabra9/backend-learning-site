const {
    createCourse,
    getInstructorCourses,
    getAllCourses,
    getCourseWithCourseId
    } = require('../models/Course.model');
const {isInstructorExist} = require('../models/Instructor.model');
const createNewCourseController = async(req,res)=>{
    try{  
        await createCourse(req.body);
        return res.status(200).json("Course Created Successfully");

    }catch(err){
        return res.status(500).json("Internal Server Error");
    }
}
const getInstructorCoursesController = async(req,res)=>{
    try{
        const isExist = await isInstructorExist(req.params.instructorId);
        if(!isExist){
            return res.status(401).json("Instructor Not exist");
        }
        const result = await getInstructorCourses(req.params.instructorId);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }   
}
const getAllCoursesController = async(req,res)=>{
    try{
        const result = await getAllCourses();
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }   
} 
const getCourseWithCourseIdController  = async(req,res)=>{
    try{
        const result = await getAllCourses(req.params.id);
        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json('Internal Server Error');
    }   
}



module.exports = {
    createNewCourseController,
    getInstructorCoursesController,
    getAllCoursesController,
    getCourseWithCourseIdController,
};