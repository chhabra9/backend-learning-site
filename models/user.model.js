const sql = require('../config/db.config');
 
    const isEmailExist  =async (email)=>{
  
    const isExistQuery = 'SELECT EXISTS(SELECT 1 FROM User WHERE email = ?) AS email_exists';
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

 const createUser = async (user)=>{
    const createUserQuery = `
    INSERT INTO User (first_name, last_name, email, password, street, city, state)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    user.firstName, user.lastName, user.email,
     user.password,user.street || null, user.city || null, user.state || null
    ];
    try{
      await sql.query(createUserQuery, values);
      const {password,...createdUser} = user;
      return createdUser;
    } catch(err){
      throw err;
    }
}


const getUser = async(email)=>{
  const getUserQuery = `SELECT * FROM User WHERE email = ?`;
  try{
    const result = await sql.query(getUserQuery,[email]);
    return result[0][0];
  } catch(err){
    throw err;
  }
}
const getAllUsers = async(email)=>{
  const getUserQuery = `SELECT * FROM User`;
  try{
    const result = await sql.query(getUserQuery);
    return result[0]
  } catch(err){
    throw err;
  }
}
const makeUserInstructor = async (userId) => {
  try {
    const makeUserInstructorQuery = `UPDATE User
      SET isInstructor = true
      WHERE user_id = ?`;
    
    await sql.query(makeUserInstructorQuery, [userId]);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
module.exports = {createUser, isEmailExist,getUser,getAllUsers,makeUserInstructor}