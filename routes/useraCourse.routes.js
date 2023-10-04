const router = require('express').Router();
const {verifyTokenAndUser,verifyTokenAndInstructor} = require('../services/verifyToken')
const {
    createUserCourseController,
    getUserCoursesController,
    getInstructorSellController,
    getAllStudentController,
    getSalesByCourseController
} = require('../controller/userCourse.controller')
router.post('/',verifyTokenAndUser,createUserCourseController);
router.get('/:user_id',verifyTokenAndUser,getUserCoursesController);
router.get('/analytics/getStudent/:instructor_id',verifyTokenAndInstructor,getAllStudentController);
router.get('/analytics/salesByCourse/:instructor_id',verifyTokenAndInstructor,getSalesByCourseController);

router.get('/analytics/:instructor_id',verifyTokenAndInstructor,getInstructorSellController)
module.exports = router;