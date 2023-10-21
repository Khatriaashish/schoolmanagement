//imports
const {z} = require('zod');

//schemas

//register Schema
const registerSchema = z.object({
    name : z.string().min(2).max(50),
    email : z.string().email(),
    role: z.string().regex(/admin|teacher|student/).default("student")
})

//password Schema
const passwordSchema = z.object({
    password: z.string().regex(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/),
    confirmPassword: z.string()
}).refine((data)=>data.password===data.confirmPassword, {
        message: "Password doesn't match",
        path: ['confirmPassword']
    }
)

//loginSchema
const loginSchema = z.object({
    email: z.string().email().min(1),
    password: z.string.min(8)
})

//exports
module.exports = {registerSchema, passwordSchema, loginSchema}