//imports
const router = require('express').Router();
const authCtrl = require('../auth/auth.controller');
const uploader = require('../middlewares/uploader.middleware');
const ValidateRequest = require('../middlewares/validate-request.middleware');
const {registerSchema, passwordSchema, loginSchema} = require('../auth/auth.validator')

//Image Directory
const dirSetup = (req, res, next)=>{
    req.uploadDir = "./public/uploads/users"
    next()
}

//api
router.post('/register', dirSetup, uploader.single('image'), ValidateRequest(registerSchema), authCtrl.register);
router.get('/verify-token/:token', authCtrl.verifyToken);
router.post('/set-password/:token', ValidateRequest(passwordSchema), authCtrl.setPassword);
router.post('/login', ValidateRequest(loginSchema), authCtrl.login);
//all-user access
router.post('/me', authCtrl.getLoggedInUser)

//exports
module.exports = router