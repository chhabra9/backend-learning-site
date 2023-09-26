const router = require('express').Router();
const {body,validationResult} = require('express-validator');
const {signupUser,loginUser} = require('../controller/auth.controller')

const validationTest = [
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('email').isEmail(),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&*])[A-Za-z\d@@$!%*?&]{8,}$/)
]

router.post('/register',validationTest,signupUser);
router.post('/login', body('email').isEmail(),loginUser);

module.exports =router;