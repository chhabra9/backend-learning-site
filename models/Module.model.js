const sql = require('../config/db.config');

const createModule = async(moduleDetails)=>{
    try{
        const createModuleQuery = `INSERT INTO Module(title, description, course_id, order_in_course)`;
        const value = [moduleDetails.title,moduleDetails.description,moduleDetails.course_id,moduleDetails.order_in_course];
        await sql.query([createModuleQuery,value]);
    }catch(err){
        throw err;
    }
}
const getAllModule = async(courseId)=>{
    try{
        const getAllModuleQuery = `SELECT * from Module where course_id = ?`;
        const result = await sql.query(getAllModuleQuery,[courseId]);
        return result[0];
    }catch(err){
        throw err;
    }
}
module.exports = {createModule, getAllModule};