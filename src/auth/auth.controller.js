//imports
const {generateRandomString} = require('../config/helpers')
const authSvc = require('../auth/auth.service')
const mailSvc = require('../service/mail.service')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Class
class AuthController{
    register = async (req, res, next)=>{
        let payload = req.body;

        if(req.file)
            payload.image = req.file.filename;
        else if(req.files)
            payload.image = req.files.map((img)=>img.filename)

        //db

        payload.status = 'inactive';
        payload.token = generateRandomString();
        //mail
        let mailMsg = authSvc.registerEmailMessage(payload.name, payload.token);
        let mailAck = mailSvc.emailSend(payload.email, "Activate your account", mailMsg);
        console.log(mailAck)

        res.json({
            result: payload
        })
    }

    async verifyToken(req, res, next){
        try{
            let token = req.params.token;
            let payload = req.body;
            if(token){
                payload.status = 'active';
                res.json({
                    result: {},
                    message: "Valid Token",
                    meta: null
                })
            }
            else{
                next({code: 400, message: "Invalid or Expired token"})
            }
        }
        catch(except){
            next(except)
        }
    }

    async setPassword(req, res, next){
        try{
            let data = req.body;

            let encPass = bcrypt.hashSync(data.password, 10);

            res.json({
                result: {
                    password: encPass
                }
            })
        }
        catch(except){
            next(except)
        }
    }

    async login(req, res, next){
        try{
            let credentials = req.body;
            let userDetail = {
                "name": "Ashish Khatri",
                "email": "khatriaashish1@gmail.com",
                "role": "admin",
                "status": "active",
                "token" : "null",
                "password": "$2a$10$KUC4sZ5jb8utyddQSRk7lumPPBs/ipACl6IIVHz3RQBK6ElLsS0BC"
            }

            if(bcrypt.compareSync(credentials.password, userDetail.password)){
                let token = jwt.sign({
                    userId: userDetail
                }, process.env.JWT_SECRET, {
                    algorithm: "HS256",
                    expiresIn: '1h'
                })
                let refreshToken = jwt.sign({
                    userId: userDetail
                }, process.env.JWT_SECRET, {
                    algorithm: "HS256",
                    expiresIn: '1d'
                })
                res.json({
                    result:{
                        token: token,
                        refreshToken: refreshToken,
                        type: "Bearer"
                    }
                })
            }
            else{
                next({code:400, message: "Credential doesn't match"});
            }
        }
        catch(except){
            next(except);
        }
    }

    async getLoggedInUser(req, res, next){
        res.json({
            result: req.authUser
        })
    }
}

//objects
const authCtrl = new AuthController();

//exports
module.exports = authCtrl;