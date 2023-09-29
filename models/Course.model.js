const sql = require('../config/db.config');
const createCourse =async (courseDetails)=>{
    const createCourseQuery =`
    INSERT INTO Course (title, thumbnail_url, description, instructor_id)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    courseDetails.title, courseDetails.thumbnail_url||null, courseDetails.description,courseDetails.instructor_id
    ];
   try{
      await sql.query(createCourseQuery,values);
   }catch(err){
        throw err;
   }
}

const getInstructorCourses = async(instructorId)=>{
    try{
        const getInstructorCoursesQuery = `SELECT * FROM Course where instructor_id = ?`;
        const result = await sql.query(getInstructorCoursesQuery,[instructorId]);
        return result[0]
    } catch(err){
        throw err;
    }
}

 const getAllCourses =  async()=>{
    try{
        const getInstructorCoursesQuery = `SELECT * FROM Course`;
        const result = await sql.query(getInstructorCoursesQuery);
        return result[0]
    } catch(err){
        // err.message = 'Internal Server Error'
        throw err;
    }
}

const getCourseWithCourseId = async(courseId)=>{
    try{
        const getInstructorCoursesQuery = `SELECT * FROM Course where course_id = ?`;
        const result = await sql.query(getInstructorCoursesQuery,[courseId]);
        return result[0]
    } catch(err){
        throw err;
    }
}

module.exports = {createCourse,getInstructorCourses,getAllCourses,getCourseWithCourseId};