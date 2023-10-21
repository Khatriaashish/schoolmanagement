//imports
const router = require('express').Router();
const authCtrl = require('../auth/auth.controller');
const uploader = require('../middlewares/uploader.middleware');
const ValidateRequest = require('../middlewares/validate-request.middleware');
const {registerSchema, passwordSchema, loginSchema} = require('../auth/auth.validator');
const checkLogin = require('../middlewares/auth.middleware');
const checkPermission = require('../middlewares/rbac.middleware')

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
router.get('/me', checkLogin, authCtrl.getLoggedInUser)
//admin access only
router.get('/admin', checkLogin, checkPermission('admin'), authCtrl.getLoggedInUser)
//admin-seller only
router.get('/admin-teacher', checkLogin, checkPermission(['admin', 'teacher']), authCtrl.getLoggedInUser)
router.post('/refresh-token', checkLogin, (req, res, next)=>{});
router.get('forget-password', (req, res, next)=>{})
router.post('/logout', (req, res, next)=>{})

//exports
module.exports = router