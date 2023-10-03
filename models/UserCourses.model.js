const sql = require('../config/db.config');
const createUserCourses = async (user_id, courseIds ) => {
   const createUserCourseQuery = `
       INSERT INTO UserCourse (user_id, course_id, purchase_date)  
       VALUES (?, ?, ?)
   `;
   
   const date = new Date(); 
   const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); 

   try {
       for (const courseId of courseIds) {
           const values = [
               user_id,
               courseId,
               formattedDate
           ];
           
           await sql.query(createUserCourseQuery, values);
       }
   } catch (err) {
       throw err;
   }
}

const isUserHasCourse = async({email,courseId})=>{
   const query  = `SELECT EXISTS(SELECT * FROM UserCourses 
      WHERE email = ? AND course_id = ?) AS COURSEEXIST;`
      try{
         const res = await sql.query(query,[email,courseId])
         return res;
      }catch(err){

      }
}
const getUserCourses = async (userId)=>{
   const query = `SELECT * from  Course where course_id in (SELECT course_id FROM UserCourse where user_id =?)`;
   try{
      const res = await sql.query(query,[userId]);
      return res[0];
   }catch(err){
      throw err;
   }
}
module.exports = {createUserCourses,isUserHasCourse,getUserCourses};