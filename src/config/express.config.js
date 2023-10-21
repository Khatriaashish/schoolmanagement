//imports
const express = require('express');
const app = express();
const router = require('../router');
const { MulterError } = require('multer');
const { ZodError } = require('zod');

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//app
app.use('/api/v1', router)

//404 handle
app.use((req, res, next)=>{
    let code = 404;
    let message = "Given route doesn't exist"

    res.status(404).json({
        result : null,
        message: message,
        meta: null
    })
})

//Exceptions
app.use((error, req, res, next)=>{
    let code = error.code??500;
    let message = error.message??"Server Error";
    let result = error.result??null;

    //Multer Error
    if(error instanceof MulterError){
        if(error.code === LIMIT_FILE_SIZE){
            code = 400,
            message = "File too large"
        }
        if(error.code === LIMIT_UNEXPECTED_FILE){
            code = 400,
            message = "Unexpected File"
        }
    }

    //zod error
    if(error instanceof ZodError){
        let msg = {};
        // console.log(error.errors)
        error.errors.map((err)=>{
            msg[err.path[0]] = err.message;
        })

        message= msg;
        code = 400;
    }

    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})

//exports
module.exports = app