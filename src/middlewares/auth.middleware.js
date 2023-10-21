//imports
const jwt = require('jsonwebtoken');

//authentication verification
const checkLogin = (req, res, next)=>{
    try{
        let token = null;

        if(req.headers['x-xsrf-token']){
            token = req.headers['x-xsry-token'];
        }

        if(req.query['token']){
            token = req.query['token']
        }

        if(req.headers['authorization']){
            token = req.headers['authorization'];
        }

        if(token===null){
            next({code: 401, message: "Login Required"})
        }
        else{
            token = (token.split(' ')).pop()
            if(!token){
                next({code: 401, message: "Token Required"})
            }
            else{
                jwt.verify(token, process.env.JWT_SECRET);
                let userDetail = {
                    "name": "Ashish Khatri",
                    "email": "khatriaashish1@gmail.com",
                    "role": "teacher",
                    "password": "$2a$10$KUC4sZ5jb8utyddQSRk7lumPPBs/ipACl6IIVHz3RQBK6ElLsS0BC"
                }
                if(userDetail){
                    req.authUser = userDetail;
                    next();
                }
                else{
                    next({code:401, message: "User Doesn't Exist"})
                }
            }
        }
    }
    catch(excpt){
        next({code: 401, message: excpt.message})
    }
}

//exports
module.exports = checkLogin