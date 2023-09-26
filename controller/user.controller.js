
 const {getAllUsers} = require('../models/user.model');

const getUsers = async(req,res)=>{
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json("server side Error")
    }
}
module.exports = {getUsers}