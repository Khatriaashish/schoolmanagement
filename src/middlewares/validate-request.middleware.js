const ValidateRequest = (schema)=>{
    return (req, res, next)=>{
        try{
            let payload = req.body;
            schema.parse(payload);
            next();
        }
        catch(e){
            next(e)
        }
    }
}

//exports
module.exports = ValidateRequest