const sql = require('../config/db.config');
const createUserCourse=async ({email,courseId})=>{
    const createUserCourseQuery =`
    INSERT INTO UserCourses (email, course_id, purchase_date)  
    VALUES(?, ?, ?)
    `;
    const date =  new Date().date;
  const values = [
      email,courseId,date ||null
    ];
   try{
      await sql.query(createUserCourseQuery,values);
   }catch(err){
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
module.exports = {createUserCourse,isUserHasCourse,getUserCourses};