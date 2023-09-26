
const router = require('express').Router();
const { createNewInstructor } = require('../controller/instructor.contoller');
router.post('/',createNewInstructor)
module.exports = router;