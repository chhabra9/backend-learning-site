
const router = require('express').Router();
const { createNewInstructorController } = require('../controller/instructor.contoller');
const {verifyTokenAndUser, verifyTokenAndInstructor} =require('../services/verifyToken');
router.post('/',verifyTokenAndUser,createNewInstructorController);
// router.get('/',verifyTokenAndInstructor);
module.exports = router;