//imports
const nodemailer = require('nodemailer');
require('dotenv').config()

//class
class MailService{
    transport;
    constructor(){
        try{
            this.transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS
                }
              });
        }
        catch(excep){
            throw excep
        }
    }
    
    async emailSend(to, subject, msg){
        try{
            await this.transport.sendMail({
                to: to,
                from: process.env.SMTP_FROM,
                subject: subject,
                html : msg
            })
        }
        catch(e){
            throw e
        }
    }
}

//object
const mailSvc = new MailService();

//exports
module.exports = mailSvc