
const router = require('express').Router();
const {verifyTokenAndUser, verifyTokenAndInstructor} = require('../services/verifyToken');
const {
     createNewCourseController,
     getInstructorCoursesController,
     getAllCoursesController,
     getCourseWithCourseIdController,

 } = require('../controller/course.controller');

router.post('/',createNewCourseController);
router.get('/instructor/:instructor_id',verifyTokenAndInstructor,getInstructorCoursesController);
router.get('/',getAllCoursesController);
router.get('/:courseId',getCourseWithCourseIdController);


module.exports = router;