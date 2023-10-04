const sql = require('../config/db.config');
const createUserCourses = async (user_id, courseData) => {
   const createUserCourseQuery = `
       INSERT INTO UserCourse (user_id, course_id,instructor_id,price,purchase_date)  
       VALUES (?, ?, ?, ? ,?);
   `;

   const date = new Date();
   const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
   console.log(courseData);
   try {
      for (const course of courseData) {
         const values = [
            user_id,
            course.course_id,
            course.instructor_id,
            course.price,
            formattedDate
         ];

         await sql.query(createUserCourseQuery, values);
      }
   } catch (err) {
      throw err;
   }
}

const isUserHasCourse = async ({ email, courseId }) => {
   const query = `SELECT EXISTS(SELECT * FROM UserCourses 
      WHERE email = ? AND course_id = ?) AS COURSEEXIST;`
   try {
      const res = await sql.query(query, [email, courseId])
      return res;
   } catch (err) {

   }
}

const getUserCourses = async (userId) => {
   const query = `SELECT * from  Course where course_id in (SELECT course_id FROM UserCourse where user_id =?)`;
   try {
      const res = await sql.query(query, [userId]);
      return res[0];
   } catch (err) {
      throw err;
   }
}
const getInstructorSell = async (instructorId) => {
   try {
      const getInstructorSellQuery = `SELECT
      months.month AS month,
      IFNULL(SUM(UserCourse.price), 0) AS total_sales
  FROM (
      SELECT DISTINCT DATE_FORMAT(DATE_SUB(CURRENT_DATE, INTERVAL n MONTH), '%Y-%m') AS month
      FROM (
          SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
      ) AS numbers
  ) AS months
  LEFT JOIN UserCourse ON months.month = DATE_FORMAT(UserCourse.purchase_date, '%Y-%m')
                     AND UserCourse.instructor_id = ?
                     AND UserCourse.purchase_date >= DATE_SUB(CURRENT_DATE, INTERVAL 5 MONTH)
                     AND UserCourse.purchase_date <= CURRENT_DATE
  GROUP BY months.month
  ORDER BY months.month;`
      const result = await sql.query(getInstructorSellQuery, [instructorId]);
      return result[0];

   } catch (err) {
      throw err;
   }
}
const getAllStudent = async (instructorId) => {
   try {
      const getAllStudentQuery = `SELECT
      u.first_name,
      u.email,
      c.title,
      uc.purchase_date,
      uc.price as purchase_rate
  FROM
      UserCourse AS uc
  JOIN
      User AS u
  ON
      uc.user_id = u.user_id
  JOIN
      Course AS c
  ON
      uc.course_id = c.course_id
  WHERE
      uc.instructor_id = ?
  ORDER BY
      uc.purchase_date;
  `
      const result = sql.query(getAllStudentQuery, [instructorId]);
      return result;
   } catch (err) {
      throw err
   }
}
const getSalesByCourse = async(instructorId)=>{
   try{
      const getSalesByCourseQuery = `SELECT
      C.title,
      SUM(UC.price) AS total_sales
  FROM
      UserCourse UC
  JOIN
      Course C ON UC.course_id = C.Course_id
  WHERE
      UC.instructor_id = ?
  GROUP BY
      C.Course_id,
      C.title
  ORDER BY
      C.Course_id;
  `
  const result = await sql.query(getSalesByCourseQuery,[instructorId]);
  return result[0];
   }catch(err){

   }
}
module.exports = { 
                  createUserCourses,
                  isUserHasCourse,
                  getUserCourses,
                  getInstructorSell,
                  getAllStudent,
                  getSalesByCourse
               };