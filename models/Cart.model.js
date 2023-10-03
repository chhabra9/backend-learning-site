const sql = require('../config/db.config');
const getAllCartItems = async(userId)=>{
    try {   
        const getAllCartItemsQuery = `select * from Course where course_id in (select course_id from Cart where user_id = ?);
        `
        const result  = await sql.query(getAllCartItemsQuery,[userId]);
        return result[0];

    } catch(err) {

        throw err;
    }
}
const deleteCartItem = async (email,course_id)=>{
    try{
        const deleteCartItemQuery = `Delete From Cart where email = ? and course_id =?`;
        await sql.query(deleteCartItemQuery,[email,course_id]);
    }catch(err){
        throw err;
    }
}
const updateCart = async (userId, courseIds) => {
    let connection; 
  
    try {
      connection = await sql.getConnection();
      await connection.beginTransaction(); 
      await connection.query('DELETE FROM cart WHERE user_id = ?', [userId]);
      for (const courseId of courseIds) {
        await connection.query('INSERT INTO cart (user_id, course_id) VALUES (?, ?)', [userId, courseId]);
      }
  
      await connection.commit();
  
    } catch (err) {
      if (connection) {
        await connection.rollback();
      }
      throw err;
    } finally {
      if (connection) {
        connection.release(); 
      }
    }
  };
  
module.exports = {getAllCartItems,updateCart};