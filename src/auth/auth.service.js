//imports
require('dotenv').config()

//class
class AuthService{
    registerEmailMessage(name, token){
        return `Dear ${name}, please click the link below to activate your account.
        <a href='${process.env.FRONTEND_URL}/register/${token}'>${process.env.FRONTEND_URL}/register/${token}</a>`
    }
}

//object
const authSvc = new AuthService();

//exports
module.exports = authSvc