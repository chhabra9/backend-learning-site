const sql = require('../config/db.config');

const isInstructorWithEmailExist =  async(email)=>{
    const isExistQuery = 'SELECT EXISTS(SELECT 1 FROM Instructor WHERE user_id = ?) AS user_exists';
    try{
      const result =  await sql.query(isExistQuery,[email]);
      const userExists = result[0][0].user_existss === 1;
      console
      if (userExists) {
        return true;
        } else {
          return false;
        }
    } catch(err){
      throw err;
    }
}
const getInstructorId =async(userId)=>{
 const getInstructorIdQuery =  `Select instructor_id from Instructor where user_id=?`;
 try{
  const result = await  sql.query(getInstructorIdQuery,[userId]);
  return result[0][0].instructor_id;
 }catch(err){
    throw err;
 }
}
const isInstructorExist = async(instructorId)=>{
    const isExistQuery = 'SELECT EXISTS(SELECT 1 FROM Instructor WHERE instructor_id = ?) AS instructor_exists';
    try{
      const result =  await sql.query(isExistQuery,[instructorId]);
      const instructorExists = result[0][0].instructor_exists === 1;
      if (instructorExists) {
        return true;
        } else {
          return false;
        }
    } catch(err){
      throw err;
    }
}
const createInstructor =async (instructorDetails)=>{
    const createInstructorQuery =`
    INSERT INTO Instructor (user_id, qualification, certifications, experience)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    instructorDetails.userId, instructorDetails.qualification , instructorDetails.certifications||null,instructorDetails.experience
    ];

   try{
        const createdInstructor = await sql.query(createInstructorQuery,values);
   }catch(err){
        throw err;
   }
    
}
module.exports = {isInstructorExist,createInstructor,isInstructorWithEmailExist,getInstructorId}