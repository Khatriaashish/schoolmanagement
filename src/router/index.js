//imports
const router = require('express').Router();
const authRouter = require('../auth/auth.router')

//routes
router.use(authRouter);

//exports
module.exports = router