const sql = require('../config/db.config');
const createUserCourses = async (email, courseIds ) => {
   const createUserCourseQuery = `
       INSERT INTO UserCourses (email, course_id, purchase_date)  
       VALUES (?, ?, ?)
   `;
   
   const date = new Date(); // Use the current date and time
   const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // Format the date as a string

   try {
       for (const courseId of courseIds) {
           const values = [
               email,
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
const getUserCourses = async (email)=>{
   const query = `SELECT * from  COURSE where course_id in (SELECT course_id FROM UserCourses where email =?)`;
   try{
      const res = await sql.query(query,[email]);
      return res[0];
   }catch(err){
      throw err;
   }
}
module.exports = {createUserCourses,isUserHasCourse,getUserCourses};