//imports
const multer = require('multer');
const fs = require('fs');

//myStorage
const myStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        let path = req.uploadDir??"./public/uploads/other";
        if(!fs.existsSync(path))
            fs.mkdirSync(path, {recursive: true});
        cb(null, path);
    },
    filename: (req, file, cb)=>{
        let random = Math.ceil(Math.random()*9999);
        let ext = file.originalname.split('.').pop();
        let filename = Date.now() + '+' + random + '.' + ext;
        cb(null, filename);
    }
})

//imageFilter
const imageFilter = (req, file, cb)=>{
    let allowed = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'];
    let ext = file.originalname.split('.').pop();
    if(allowed.includes(ext))
        cb(null, true)
    else    
        cb({code: 400, message: "File format not supported"})
}

//uploader
const uploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 300000
    }
})

//exports
module.exports = uploader