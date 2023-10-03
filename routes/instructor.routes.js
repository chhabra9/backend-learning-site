
const router = require('express').Router();
const { createNewInstructorController } = require('../controller/instructor.contoller');
const {verifyTokenAndUser, verifyTokenAndInstructor} =require('../services/verifyToken');
router.post('/:user_id',verifyTokenAndUser,createNewInstructorController);
// router.get('/',verifyTokenAndInstructor);
module.exports = router;