//imports
const http = require('http');
const app = require("./src/config/express.config")

//server
const server = http.createServer(app)

//servver-listen
server.listen('5005', (err)=>{
    if(!err){
        console.log("Server is running at port 5005");
        console.log("ctrl + c to stop the server");
        console.log("Browse at http://localhost:5005");
    }
})

