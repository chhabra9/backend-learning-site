const router = require('express').Router();
const {verifyTokenAndUser} = require('../services/verifyToken')
const {createUserCourseController,getUserCoursesController} = require('../controller/userCourse.controller')
router.post('/',verifyTokenAndUser,createUserCourseController);
router.get('/:user_id',verifyTokenAndUser,getUserCoursesController);
module.exports = router;