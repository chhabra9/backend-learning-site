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
const isInstructorExist = async(instructorId)=>{
    const isExistQuery = 'SELECT EXISTS(SELECT 1 FROM Instructor WHERE instructor_id = ?) AS instructor_exists';
    try{
      const result =  await sql.query(isExistQuery,[instructorId]);
      const instructorExists = result[0][0].instructor_exists === 1;
      console
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
    instructorDetails.email, instructorDetails.qualification ||null, instructorDetails.certifications ||null,instructorDetails.experience
    ];
   try{
        const createdInstructor = await sql.query(createInstructorQuery,values);
        return createdInstructor;
   }catch(err){
        throw err;
   }
    
}
module.exports = {isInstructorExist,createInstructor,isInstructorWithEmailExist}