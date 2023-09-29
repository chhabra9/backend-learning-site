const sql = require('../config/db.config');

const isInstructorWithEmailExist =  async(email)=>{
    const isExistQuery = 'SELECT EXISTS(SELECT 1 FROM Instructor WHERE email = ?) AS email_exists';
    try{
      const result =  await sql.query(isExistQuery,[email]);
      const emailExists = result[0][0].email_exists === 1;
      console
      if (emailExists) {
        return true;
        } else {
          return false;
        }
    } catch(err){
      throw err;
    }
}
const getInstructorId =async(email)=>{
 const getInstructorIdQuery =  `Select instructor_id from Instructor where email=?`;
 try{
  const result = await  sql.query(getInstructorIdQuery,[email]);
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
    INSERT INTO Instructor (email, qualification, certifications, experience)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    instructorDetails.email, instructorDetails.qualification , instructorDetails.certifications||null,instructorDetails.experience
    ];
   try{
        const createdInstructor = await sql.query(createInstructorQuery,values);
        return createdInstructor;
   }catch(err){
        throw err;
   }
    
}
module.exports = {isInstructorExist,createInstructor,isInstructorWithEmailExist,getInstructorId}