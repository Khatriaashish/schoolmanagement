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
                    "status": "active",
                    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsibmFtZSI6IkFzaGlzaCBLaGF0cmkiLCJlbWFpbCI6ImtoYXRyaWFhc2hpc2gxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInN0YXR1cyI6ImFjdGl2ZSIsInRva2VuIjoibnVsbCIsInBhc3N3b3JkIjoiJDJhJDEwJEtVQzRzWjVqYjh1dHlkZFFTUms3bHVtUFBCcy9pcEFDbDZJSVZIejNSUUJLNkVsTHNTMEJDIn0sImlhdCI6MTY5Nzg3MzQ0MywiZXhwIjoxNjk3ODc3MDQzfQ.ZUKPh7h6yLMephA_CNp00Li0Yv9jHhEBlznUiAxFSho",
                    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsibmFtZSI6IkFzaGlzaCBLaGF0cmkiLCJlbWFpbCI6ImtoYXRyaWFhc2hpc2gxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsInN0YXR1cyI6ImFjdGl2ZSIsInRva2VuIjoibnVsbCIsInBhc3N3b3JkIjoiJDJhJDEwJEtVQzRzWjVqYjh1dHlkZFFTUms3bHVtUFBCcy9pcEFDbDZJSVZIejNSUUJLNkVsTHNTMEJDIn0sImlhdCI6MTY5Nzg3MzQ0MywiZXhwIjoxNjk3OTU5ODQzfQ.5vRvdeusZx2R5naXhi9wBlUv5isHJJSaNWnI1NHVtgQ",
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